require 'csv'

namespace :authors do
  desc "Backfill: Match existing articles to featured authors"
  task :backfill_matches => :environment do
    puts "=" * 60
    puts "BACKFILL: MATCHING ARTICLES TO FEATURED AUTHORS"
    puts "=" * 60

    featured_authors = Author.where(featured: true)
    puts "Featured authors to match against: #{featured_authors.count}"
    puts "Featured author names: #{featured_authors.pluck(:name).join(', ')}"

    total_articles = Article.count
    matched_articles = 0
    new_links_created = 0
    processed = 0

    puts "\nProcessing #{total_articles} articles..."

    Article.includes(:authors).find_each do |article|
      processed += 1

      # Get all bylines from this article's existing authors
      bylines = article.authors.pluck(:name)

      # Try to match each byline against featured authors
      bylines.each do |byline|
        matched_featured = Author.match_byline_to_featured(byline)

        matched_featured.each do |featured_author|
          # Check if this article is already linked to this featured author
          unless article.authors.include?(featured_author)
            article.authors << featured_author
            new_links_created += 1
            puts "  [MATCH] '#{article.title&.truncate(40)}' -> #{featured_author.name}"
          end
        end

        matched_articles += 1 if matched_featured.any?
      end

      # Progress indicator
      if processed % 1000 == 0
        puts "  Processed #{processed}/#{total_articles} articles..."
      end
    end

    puts "\n" + "=" * 60
    puts "BACKFILL COMPLETE"
    puts "=" * 60
    puts "Articles processed: #{processed}"
    puts "Articles with matches: #{matched_articles}"
    puts "New author-article links created: #{new_links_created}"
  end

  desc "Preview: Show which articles would match featured authors (dry run)"
  task :backfill_preview => :environment do
    puts "=" * 60
    puts "BACKFILL PREVIEW (DRY RUN)"
    puts "=" * 60

    featured_authors = Author.where(featured: true)
    puts "Featured authors to match against: #{featured_authors.count}"

    # Show a sample of what would match
    sample_matches = {}

    Article.includes(:authors).limit(10000).find_each do |article|
      bylines = article.authors.pluck(:name)

      bylines.each do |byline|
        matched_featured = Author.match_byline_to_featured(byline)

        matched_featured.each do |featured_author|
          unless article.authors.include?(featured_author)
            sample_matches[featured_author.name] ||= []
            if sample_matches[featured_author.name].length < 3
              sample_matches[featured_author.name] << {
                title: article.title&.truncate(50),
                byline: byline
              }
            end
          end
        end
      end
    end

    puts "\nSample matches found:"
    sample_matches.each do |author_name, matches|
      puts "\n#{author_name}:"
      matches.each do |match|
        puts "  - '#{match[:title]}' (byline: #{match[:byline]})"
      end
    end

    puts "\n" + "=" * 60
    puts "This was a preview. Run 'rake authors:backfill_matches' to apply."
    puts "=" * 60
  end

  desc "Show stats on featured author article coverage"
  task :coverage_report => :environment do
    puts "=" * 60
    puts "FEATURED AUTHOR COVERAGE REPORT"
    puts "=" * 60

    Author.where(featured: true).order(:name).each do |author|
      article_count = author.articles.count
      recent_count = author.articles.where('published_at > ?', 30.days.ago).count
      puts "#{author.name}: #{article_count} articles (#{recent_count} in last 30 days)"
    end
  end

  desc "Merge duplicate featured authors (keeps the one with more articles)"
  task :merge_duplicates => :environment do
    puts "=" * 60
    puts "MERGING DUPLICATE FEATURED AUTHORS"
    puts "=" * 60

    # Define duplicates to merge: [keep_name, remove_name]
    duplicates = [
      ['Matthew Yglesias', 'Matt Yglesias'],
      ['Heather Cox Richardson', 'Heather Richardson'],
    ]

    duplicates.each do |keep_name, remove_name|
      keep = Author.find_by(name: keep_name)
      remove = Author.find_by(name: remove_name)

      if keep && remove
        puts "\nMerging '#{remove_name}' into '#{keep_name}'..."
        puts "  Keep: ID=#{keep.id}, articles=#{keep.articles.count}, subscribers=#{keep.users.count}"
        puts "  Remove: ID=#{remove.id}, articles=#{remove.articles.count}, subscribers=#{remove.users.count}"

        # Transfer articles
        AuthorArticle.where(author_id: remove.id).each do |aa|
          unless AuthorArticle.exists?(author_id: keep.id, article_id: aa.article_id)
            aa.update!(author_id: keep.id)
          end
        end

        # Transfer subscriptions
        UserAuthor.where(author_id: remove.id).each do |ua|
          unless UserAuthor.exists?(author_id: keep.id, user_id: ua.user_id)
            ua.update!(author_id: keep.id)
          end
        end

        # Copy bio if keep doesn't have one
        if keep.bio.blank? && remove.bio.present?
          keep.update!(bio: remove.bio)
        end

        # Delete the duplicate
        remove.destroy
        puts "  Merged! '#{keep_name}' now has #{keep.reload.articles.count} articles"
      else
        puts "\nSkipping '#{keep_name}' / '#{remove_name}' - one or both not found"
      end
    end

    puts "\n" + "=" * 60
    puts "MERGE COMPLETE"
    puts "=" * 60
  end

  desc "Delete all author records that have multiple authors (contain 'and' or ',')"
  task :delete_multi_author_records => :environment do
    puts "=" * 60
    puts "DELETING MULTI-AUTHOR RECORDS"
    puts "=" * 60

    # Find authors with "and" in the name (co-author bylines)
    multi_and = Author.where("name LIKE '% and %'").where(featured: false)
    # Find authors with commas in the name
    multi_comma = Author.where("name LIKE '%,%'").where(featured: false)

    puts "Authors with 'and' in name: #{multi_and.count}"
    puts "Authors with commas in name: #{multi_comma.count}"

    # Combine and dedupe
    multi_author_ids = (multi_and.pluck(:id) + multi_comma.pluck(:id)).uniq
    puts "Total unique multi-author records to delete: #{multi_author_ids.count}"

    # Check for any with subscriptions (we should preserve those)
    with_subs = UserAuthor.where(author_id: multi_author_ids).distinct.pluck(:author_id)
    if with_subs.any?
      puts "\nWARNING: #{with_subs.count} multi-author records have subscriptions and will be skipped"
      multi_author_ids -= with_subs
    end

    puts "\nDeleting #{multi_author_ids.count} multi-author records..."

    # Delete in batches
    deleted = 0
    multi_author_ids.each_slice(1000) do |batch|
      # First delete the author_articles
      AuthorArticle.where(author_id: batch).delete_all
      # Then delete the authors
      deleted += Author.where(id: batch).delete_all
      puts "  Deleted #{deleted}/#{multi_author_ids.count}..."
    end

    puts "\n" + "=" * 60
    puts "DELETION COMPLETE"
    puts "=" * 60
    puts "Multi-author records deleted: #{deleted}"
    puts "Records with subscriptions (preserved): #{with_subs.count}"
  end

  desc "Preview multi-author records that would be deleted (dry run)"
  task :delete_multi_author_preview => :environment do
    puts "=" * 60
    puts "MULTI-AUTHOR DELETION PREVIEW (DRY RUN)"
    puts "=" * 60

    multi_and = Author.where("name LIKE '% and %'").where(featured: false)
    multi_comma = Author.where("name LIKE '%,%'").where(featured: false)

    puts "Authors with 'and' in name: #{multi_and.count}"
    puts "Sample:"
    multi_and.limit(10).each { |a| puts "  - #{a.name.truncate(60)}" }

    puts "\nAuthors with commas in name: #{multi_comma.count}"
    puts "Sample:"
    multi_comma.limit(10).each { |a| puts "  - #{a.name.truncate(60)}" }

    multi_author_ids = (multi_and.pluck(:id) + multi_comma.pluck(:id)).uniq
    with_subs = UserAuthor.where(author_id: multi_author_ids).distinct.count

    puts "\n" + "=" * 60
    puts "PREVIEW SUMMARY"
    puts "=" * 60
    puts "Total would delete: #{multi_author_ids.count}"
    puts "Have subscriptions (would preserve): #{with_subs}"
    puts "\nRun 'rake authors:delete_multi_author_records' to apply."
  end

  desc "Auto-assign categories to featured authors based on frequency and bio keywords"
  task :auto_categorize => :environment do
    puts "=" * 60
    puts "AUTO-CATEGORIZING FEATURED AUTHORS"
    puts "=" * 60

    # Create 'prolific' category if it doesn't exist
    prolific_category = Category.find_or_create_by!(label: 'prolific')
    puts "Prolific category ID: #{prolific_category.id}"

    # Get existing categories
    politics_cat = Category.find_by(label: 'politics')
    tech_cat = Category.find_by(label: 'tech')
    culture_cat = Category.find_by(label: 'culture')
    sports_cat = Category.find_by(label: 'sports')

    # Keywords for auto-categorization (expanded)
    politics_keywords = %w[
      politics political policy economist government democracy congress senate legislation
      vote voting election president liberal conservative democrat republican washington
      diplomacy foreign affairs geopolitics ukraine russia china nato democracy autocracy
      columnist opinion editorial supreme court justice rights law attorney administration
      white house capitol hill state department pentagon intelligence cia fbi national security
    ]
    tech_keywords = %w[
      tech technology software silicon programmer engineer startup crypto ai artificial
      intelligence platform digital internet web app developer venture capital vc fintech
      blockchain machine learning data science computing cloud amazon google apple microsoft
      facebook meta twitter semiconductor chip hardware computing cybersecurity privacy
      stratechery newsletter analyst
    ]
    culture_keywords = %w[
      culture writer author novelist book literature art music film movie television
      entertainment media critic creative essay poetry fiction nonfiction journalism
      newsletter brain pickings marginalian curator ideas thinker philosophy substack
      books reading literary review magazine atlantic new yorker
    ]
    sports_keywords = %w[
      sports basketball football baseball soccer hockey nba nfl mlb athlete game team
      player coach olympics espn athletic stadium championship league playoffs draft
      trade injury roster standings
    ]

    # Manual category assignments for well-known authors whose bios may not have keywords
    # Format: 'Author Name' => ['category1', 'category2']
    manual_assignments = {
      'Matthew Yglesias' => ['politics'],
      'Ezra Klein' => ['politics'],
      'Heather Cox Richardson' => ['politics'],
      'Anne Applebaum' => ['politics'],
      'Jamelle Bouie' => ['politics'],
      'David French' => ['politics'],
      'Ross Douthat' => ['politics'],
      'Bret Stephens' => ['politics'],
      'Paul Krugman' => ['politics'],
      'Maureen Dowd' => ['politics'],
      'Ben Thompson' => ['tech'],
      'Casey Newton' => ['tech'],
      'Kara Swisher' => ['tech'],
      'Kevin Roose' => ['tech'],
      'Charlie Warzel' => ['tech', 'politics'],
      'Maria Popova' => ['culture'],
      'Roxane Gay' => ['culture'],
      'Chuck Klosterman' => ['culture'],
      'Wesley Morris' => ['culture'],
      'Ta-Nehisi Coates' => ['culture', 'politics'],
    }

    updated_count = 0
    prolific_count = 0

    Author.where(featured: true).find_each do |author|
      changes = []

      # Calculate articles per week
      recent = author.articles.where('published_at > ?', 90.days.ago).count
      weeks = 90.0 / 7.0
      per_week = recent / weeks

      # Add to 'prolific' if writing ~1 article every 2 weeks or more (0.5+/week)
      if per_week >= 0.5
        unless author.categories.include?(prolific_category)
          author.categories << prolific_category
          changes << 'prolific'
          prolific_count += 1
        end
      end

      # Check manual assignments first
      if manual_assignments[author.name]
        manual_assignments[author.name].each do |cat_label|
          cat = Category.find_by(label: cat_label)
          if cat && !author.categories.include?(cat)
            author.categories << cat
            changes << cat_label
          end
        end
      end

      # Auto-categorize based on bio keywords (only if not already categorized)
      bio_lower = (author.bio || '').downcase

      if politics_cat && !author.categories.include?(politics_cat)
        if politics_keywords.any? { |kw| bio_lower.include?(kw) }
          author.categories << politics_cat
          changes << 'politics'
        end
      end

      if tech_cat && !author.categories.include?(tech_cat)
        if tech_keywords.any? { |kw| bio_lower.include?(kw) }
          author.categories << tech_cat
          changes << 'tech'
        end
      end

      if culture_cat && !author.categories.include?(culture_cat)
        if culture_keywords.any? { |kw| bio_lower.include?(kw) }
          author.categories << culture_cat
          changes << 'culture'
        end
      end

      if sports_cat && !author.categories.include?(sports_cat)
        if sports_keywords.any? { |kw| bio_lower.include?(kw) }
          author.categories << sports_cat
          changes << 'sports'
        end
      end

      if changes.any?
        puts "  #{author.name}: added [#{changes.join(', ')}]"
        updated_count += 1
      end
    end

    puts "\n" + "=" * 60
    puts "AUTO-CATEGORIZATION COMPLETE"
    puts "=" * 60
    puts "Authors updated: #{updated_count}"
    puts "Authors marked as prolific: #{prolific_count}"
  end

  desc "Preview auto-categorization (dry run)"
  task :auto_categorize_preview => :environment do
    puts "=" * 60
    puts "AUTO-CATEGORIZATION PREVIEW (DRY RUN)"
    puts "=" * 60

    # Same keywords as the main task
    politics_keywords = %w[
      politics political policy economist government democracy congress senate legislation
      vote voting election president liberal conservative democrat republican washington
      diplomacy foreign affairs geopolitics columnist opinion editorial
    ]
    tech_keywords = %w[
      tech technology software silicon programmer engineer startup crypto ai artificial
      intelligence platform digital internet web app developer venture capital stratechery
    ]
    culture_keywords = %w[
      culture writer author novelist book literature art music film movie television
      entertainment media critic creative essay brain pickings marginalian
    ]
    sports_keywords = %w[
      sports basketball football baseball soccer hockey nba nfl mlb athlete
    ]

    # Manual assignments
    manual_assignments = {
      'Matthew Yglesias' => ['politics'],
      'Ezra Klein' => ['politics'],
      'Heather Cox Richardson' => ['politics'],
      'Anne Applebaum' => ['politics'],
      'Jamelle Bouie' => ['politics'],
      'David French' => ['politics'],
      'Ross Douthat' => ['politics'],
      'Bret Stephens' => ['politics'],
      'Paul Krugman' => ['politics'],
      'Maureen Dowd' => ['politics'],
      'Ben Thompson' => ['tech'],
      'Casey Newton' => ['tech'],
      'Kara Swisher' => ['tech'],
      'Kevin Roose' => ['tech'],
      'Charlie Warzel' => ['tech', 'politics'],
      'Maria Popova' => ['culture'],
      'Roxane Gay' => ['culture'],
      'Chuck Klosterman' => ['culture'],
      'Wesley Morris' => ['culture'],
      'Ta-Nehisi Coates' => ['culture', 'politics'],
    }

    Author.where(featured: true).find_each do |author|
      changes = []

      # Calculate articles per week
      recent = author.articles.where('published_at > ?', 90.days.ago).count
      weeks = 90.0 / 7.0
      per_week = recent / weeks

      if per_week >= 0.5
        changes << 'prolific'
      end

      # Check manual assignments
      if manual_assignments[author.name]
        changes += manual_assignments[author.name]
      end

      bio_lower = (author.bio || '').downcase
      changes << 'politics' if politics_keywords.any? { |kw| bio_lower.include?(kw) }
      changes << 'tech' if tech_keywords.any? { |kw| bio_lower.include?(kw) }
      changes << 'culture' if culture_keywords.any? { |kw| bio_lower.include?(kw) }
      changes << 'sports' if sports_keywords.any? { |kw| bio_lower.include?(kw) }

      changes.uniq!
      current_cats = author.categories.pluck(:label)
      new_cats = changes - current_cats

      if new_cats.any?
        puts "  #{author.name} (#{per_week.round(2)}/week):"
        puts "    Current: [#{current_cats.join(', ')}]"
        puts "    Would add: [#{new_cats.join(', ')}]"
        puts "    Bio: #{author.bio&.truncate(80) || '(no bio)'}"
      end
    end

    puts "\n" + "=" * 60
    puts "Run 'rake authors:auto_categorize' to apply."
    puts "=" * 60
  end

  desc "Mark all prolific authors (0.5+ articles/week) as featured"
  task :mark_prolific_featured => :environment do
    puts "=" * 60
    puts "MARKING PROLIFIC AUTHORS AS FEATURED"
    puts "=" * 60

    count = 0
    Author.find_each do |author|
      recent = author.articles.where('published_at > ?', 90.days.ago).count
      weeks = 90.0 / 7.0
      per_week = recent / weeks

      if per_week >= 0.5 && !author.featured
        author.update!(featured: true)
        puts "  Marked as featured: #{author.name} (#{per_week.round(2)}/week)"
        count += 1
      end
    end

    puts "\n" + "=" * 60
    puts "COMPLETE"
    puts "=" * 60
    puts "Total newly marked as featured: #{count}"
  end
end

namespace :cleanup do
  desc "Clean up duplicate and malformed author names"
  task :authors => :environment do
    puts "=" * 60
    puts "AUTHOR CLEANUP TASK"
    puts "=" * 60

    merged_count = 0
    deleted_count = 0
    cleaned_count = 0

    # 1. Clean up repeated names like "Dave Zirin,Dave Zirin,Dave Zirin"
    puts "\n--- Cleaning repeated comma-separated names ---"
    Author.where("name LIKE '%,%'").find_each do |author|
      parts = author.name.split(',').map(&:strip)
      unique_parts = parts.uniq

      # If all parts are the same name repeated
      if unique_parts.length == 1 && parts.length > 1
        clean_name = unique_parts.first

        # Check if there's already an author with the clean name
        existing = Author.where(name: clean_name).where.not(id: author.id).first

        if existing
          # Merge: transfer articles and subscriptions to existing, then delete duplicate
          puts "  Merging '#{author.name[0..50]}...' into existing '#{clean_name}' (ID: #{existing.id})"

          AuthorArticle.where(author_id: author.id).update_all(author_id: existing.id)
          UserAuthor.where(author_id: author.id).update_all(author_id: existing.id)

          author.destroy
          merged_count += 1
        else
          # Just rename
          puts "  Cleaning '#{author.name[0..50]}...' -> '#{clean_name}'"
          author.update!(name: clean_name)
          cleaned_count += 1
        end
      end
    end

    # 2. Delete empty/blank authors with no articles and no subscriptions
    puts "\n--- Removing blank authors with no content ---"
    blank_authors = Author.where("name IS NULL OR TRIM(name) = ''")
    blank_authors.each do |author|
      if author.articles.count == 0 && author.users.count == 0
        puts "  Deleting blank author ID: #{author.id}"
        author.destroy
        deleted_count += 1
      end
    end

    # 3. Report on remaining issues that need manual review
    puts "\n--- Issues requiring manual review ---"

    compound_names = Author.where("name LIKE '% and %'").count
    puts "  Authors with 'and' in name (co-authors): #{compound_names}"

    comma_names = Author.where("name LIKE '%,%'").count
    puts "  Authors with commas in name: #{comma_names}"

    puts "\n" + "=" * 60
    puts "CLEANUP COMPLETE"
    puts "=" * 60
    puts "Authors merged into existing: #{merged_count}"
    puts "Authors renamed/cleaned: #{cleaned_count}"
    puts "Blank authors deleted: #{deleted_count}"
    puts "\nNote: Co-author names (containing 'and') are not automatically"
    puts "split as they may represent collaborative bylines."
  end

  desc "Show detailed report of author data quality issues"
  task :authors_report => :environment do
    puts "=" * 60
    puts "AUTHOR DATA QUALITY REPORT"
    puts "=" * 60

    puts "\n--- Overall Stats ---"
    puts "Total authors: #{Author.count}"
    puts "Featured authors (imported with bios): #{Author.where(featured: true).count}"
    puts "Authors with bios: #{Author.where.not(bio: [nil, '']).count}"

    puts "\n--- Problematic Names ---"

    # Repeated names
    repeated = Author.where("name LIKE '%,%'").select { |a|
      parts = a.name.split(',')
      parts.uniq.length < parts.length
    }
    puts "Authors with repeated comma names (e.g., 'Name,Name,Name'): #{repeated.count}"
    if repeated.count > 0 && repeated.count <= 5
      repeated.each { |a| puts "  ##{a.id}: #{a.name[0..60]}" }
    end

    # Compound names
    compound = Author.where("name LIKE '% and %'").count
    puts "Authors with 'and' in name: #{compound}"

    # Comma names (non-repeated)
    comma_other = Author.where("name LIKE '%,%'").count - repeated.count
    puts "Authors with commas (other patterns): #{comma_other}"

    # Blank names
    blank = Author.where("name IS NULL OR TRIM(name) = ''").count
    puts "Authors with blank/empty names: #{blank}"

    puts "\n--- Feed Coverage ---"
    total_feeds = Feed.count
    feeds_with_featured = Feed.joins(articles: :authors).where(authors: { featured: true }).distinct.count
    puts "Total feeds: #{total_feeds}"
    puts "Feeds with at least one featured author: #{feeds_with_featured}"
    puts "Feeds without featured authors: #{total_feeds - feeds_with_featured}"

    puts "\n--- Subscription Impact ---"
    subscribed_authors = Author.joins(:user_authors).distinct.count
    subscribed_featured = Author.where(featured: true).joins(:user_authors).distinct.count
    puts "Total authors with subscriptions: #{subscribed_authors}"
    puts "Featured authors with subscriptions: #{subscribed_featured}"
  end

  desc "Preview author cleanup (dry run, no changes)"
  task :authors_preview => :environment do
    puts "=" * 60
    puts "AUTHOR CLEANUP PREVIEW (DRY RUN)"
    puts "=" * 60

    would_merge = 0
    would_clean = 0
    would_delete = 0

    # 1. Check repeated names
    puts "\n--- Would clean repeated comma-separated names ---"
    Author.where("name LIKE '%,%'").find_each do |author|
      parts = author.name.split(',').map(&:strip)
      unique_parts = parts.uniq

      if unique_parts.length == 1 && parts.length > 1
        clean_name = unique_parts.first
        existing = Author.where(name: clean_name).where.not(id: author.id).first

        if existing
          puts "  WOULD MERGE: '#{author.name[0..40]}...' (ID:#{author.id}) into existing '#{clean_name}' (ID:#{existing.id})"
          would_merge += 1
        else
          puts "  WOULD RENAME: '#{author.name[0..40]}...' (ID:#{author.id}) -> '#{clean_name}'"
          would_clean += 1
        end
      end
    end

    # 2. Check blank authors
    puts "\n--- Would delete blank authors ---"
    Author.where("name IS NULL OR TRIM(name) = ''").each do |author|
      if author.articles.count == 0 && author.users.count == 0
        puts "  WOULD DELETE: blank author ID:#{author.id}"
        would_delete += 1
      end
    end

    puts "\n" + "=" * 60
    puts "PREVIEW SUMMARY (no changes made)"
    puts "=" * 60
    puts "Would merge: #{would_merge}"
    puts "Would rename: #{would_clean}"
    puts "Would delete: #{would_delete}"
  end
end

namespace :import do
  desc "Import authors and feeds from CSV data"
  task :authors_csv, [:file_path] => :environment do |t, args|
    file_path = args[:file_path]

    if file_path.nil?
      puts "Usage: rake import:authors_csv[/path/to/file.csv]"
      exit 1
    end

    unless File.exist?(file_path)
      puts "File not found: #{file_path}"
      exit 1
    end

    import_from_csv(File.read(file_path))
  end

  desc "Import authors and feeds from inline CSV data"
  task :authors => :environment do
    csv_data = <<~CSV
RSS Feed,First Name,Last Name,Publication,Description
https://neilgaiman.com/feed/,Neil,Gaiman,Neil Gaiman's Journal,"An award-winning novelist sharing updates on his books, TV adaptations, and personal life."
https://whatever.scalzi.com/feed/,John,Scalzi,Whatever,"A Hugo Award-winning sci-fi author writing about pop culture, politics, and the writing life."
https://georgesaunders.substack.com/feed,George,Saunders,Story Club,"A Booker Prize winner teaching the art of the short story through analysis and community discussion."
https://margaretatwood.substack.com/feed,Margaret,Atwood,In the Writing Burrow,"The legendary author of The Handmaid's Tale sharing musings, audio recordings, and updates."
https://chuckpalahniuk.substack.com/feed,Chuck,Palahniuk,Plot Spoiler,"The author of Fight Club offering transgressive fiction lessons and serialized stories."
https://salmanrushdie.substack.com/feed,Salman,Rushdie,Salman's Sea of Stories,"A celebrated novelist publishing serialized fiction, personal essays, and film discussions."
https://tim.blog/feed/,Tim,Ferriss,The Tim Ferriss Blog,"A productivity expert exploring high-performance habits, lifestyle design, and health experiments."
https://seths.blog/feed/,Seth,Godin,Seth's Blog,"A marketing guru publishing daily, bite-sized insights on creativity, leadership, and change."
https://jamesclear.com/feed,James,Clear,JamesClear.com,"The author of Atomic Habits writing actionable articles on habit formation and continuous improvement."
https://austinkleon.com/feed/,Austin,Kleon,Austin Kleon's Blog,"A writer who draws, sharing inspiration on creativity, art, and the creative process."
https://ryanholiday.net/feed/,Ryan,Holiday,RyanHoliday.net,"A modern philosopher applying ancient Stoic wisdom to contemporary business and life challenges."
https://www.themarginalian.org/feed/,Maria,Popova,The Marginalian,"A digest of cross-disciplinary learnings from literature, science, art, and philosophy."
https://calnewport.com/feed/,Cal,Newport,Study Hacks,"A computer science professor writing about deep work, digital minimalism, and focus."
https://pluralistic.net/feed/,Cory,Doctorow,Pluralistic,"A sci-fi author and activist logging daily links on technology, surveillance, and digital rights."
https://krebsonsecurity.com/feed/,Brian,Krebs,Krebs on Security,"An investigative journalist reporting on cybercrime, data breaches, and security news."
https://www.schneier.com/feed/atom/,Bruce,Schneier,Schneier on Security,"A security cryptographer analyzing the intersection of security technology and public policy."
https://stratechery.com/feed/,Ben,Thompson,Stratechery,"An analyst providing deep strategic analysis of the business, strategy, and impact of technology."
https://www.platformer.news/rss/,Casey,Newton,Platformer,"A tech journalist covering the intersection of Silicon Valley giants and democracy."
https://daringfireball.net/feeds/main,John,Gruber,Daring Fireball,"A tech writer focusing on Apple news, design, and the open web with a distinct editorial voice."
https://www.slowboring.com/feed,Matthew,Yglesias,Slow Boring,"A policy journalist writing data-driven articles on American politics, economics, and culture."
https://noahpinion.substack.com/feed,Noah,Smith,Noahpinion,"An economist offering optimistic and analytical takes on economics, technology, and geopolitics."
https://andrewsullivan.substack.com/feed,Andrew,Sullivan,The Weekly Dish,"A conservative political commentator offering independent analysis on current events and culture."
https://www.racket.news/feed,Matt,Taibbi,Racket News,"An investigative journalist providing critical commentary on media, politics, and free speech."
https://greenwald.substack.com/feed,Glenn,Greenwald,Glenn Greenwald,"A journalist focusing on civil liberties, surveillance, and media criticism."
https://www.thefp.com/feed,Bari,Weiss,The Free Press,"An editor leading a media company that covers underreported stories and cultural debates."
https://freddiedeboer.substack.com/feed,Freddie,deBoer,Freddie deBoer,"A writer and academic critiquing media narratives, education policy, and political culture."
https://sinocism.com/feed,Bill,Bishop,Sinocism,"A China expert providing a daily digest of news and analysis on Chinese politics and business."
https://zeynep.substack.com/feed,Zeynep,Tufekci,The Insight,"A sociologist analyzing the complex interactions between technology, society, and social movements."
https://heathercoxrichardson.substack.com/feed,Heather,Richardson,Letters from an American,"A historian placing daily American political news into the broader context of U.S. history."
https://robertreich.substack.com/feed,Robert,Reich,Robert Reich,"A former Labor Secretary writing about inequality, labor, and the American economy."
https://kareem.substack.com/feed,Kareem,Abdul-Jabbar,Kareem Abdul-Jabbar,"An NBA legend and cultural critic writing about sports, politics, and social justice."
https://michaelmoore.substack.com/feed,Michael,Moore,Michael Moore,"A filmmaker and activist sharing political commentary, podcasts, and calls to action."
https://audacity.substack.com/feed,Roxane,Gay,The Audacity,"A cultural critic writing essays on feminism, pop culture, and the complexities of modern life."
https://cherylstrayed.substack.com/feed,Cheryl,Strayed,Dear Sugar,"The author of Wild offering compassionate advice on love, loss, and the human condition."
https://maybebaby.co/feed,Haley,Nahman,Maybe Baby,"A culture writer publishing thoughtful essays on modern life, consumption, and the internet."
https://hungup.substack.com/feed,Hunter,Harris,Hung Up,"A culture writer providing humorous and obsessive coverage of movies, TV, and celebrity news."
https://www.cerealaisle.com/feed,Leandra,Medine Cohen,The Cereal Aisle,"A fashion writer sharing personal style diaries, shopping recommendations, and lifestyle essays."
https://www.theguardian.com/profile/marinahyde/rss,Marina,Hyde,The Guardian,"A columnist known for her sharp, satirical take on British politics and celebrity culture."
https://www.theguardian.com/profile/georgemonbiot/rss,George,Monbiot,The Guardian,"An environmental activist writing incisive columns on climate change and political corruption."
https://www.theguardian.com/profile/adityachakrabortty/rss,Aditya,Chakrabortty,The Guardian,"A senior economics commentator reporting on wealth, inequality, and local communities."
https://www.theguardian.com/profile/owen-jones/rss,Owen,Jones,The Guardian,"A socialist commentator writing about British politics, labor rights, and social justice."
https://www.theguardian.com/profile/johncrace/rss,John,Crace,The Guardian,"A parliamentary sketch writer known for his humorous summaries of UK political proceedings."
https://smittenkitchen.com/feed/,Deb,Perelman,Smitten Kitchen,"A beloved food writer sharing accessible, comfort-food recipes with witty introductions."
https://alisoneroman.substack.com/feed,Alison,Roman,A Newsletter,"A cookbook author sharing unfiltered recipes, video tutorials, and lifestyle recommendations."
https://tedgioia.substack.com/feed,Ted,Gioia,The Honest Broker,"A music historian writing about the state of culture, the music industry, and the arts."
https://www.davidlebovitz.com/feed/,David,Lebovitz,David Lebovitz,"A pastry chef living in Paris sharing recipes, travel tips, and stories about French life."
https://janefriedman.com/feed/,Jane,Friedman,Jane Friedman,"A publishing expert offering advice on the business of writing and the book industry."
https://orbitaloperations.com/feed,Warren,Ellis,Orbital Operations,"A comic book writer and novelist sharing newsletters on his current projects and internet finds."
https://joycecaroloates.substack.com/feed,Joyce,Carol Oates,Joyce Carol Oates,"A prolific literary giant sharing diary entries, photography, and thoughts on writing."
https://etgarkeret.substack.com/feed,Etgar,Keret,Alphabet Soup,"An Israeli writer sharing surreal short stories and personal reflections on life and conflict."
CSV

    import_from_csv(csv_data)
  end

  desc "Import authors batch 2"
  task :authors_batch2 => :environment do
    # Tab-separated: First, Last, Publication, Feed URL, Description
    tsv_data = <<~TSV
Heather Cox	Richardson	Substack (Letters from an American)	https://heathercoxrichardson.substack.com/feed	Historian who chronicles current events through the lens of American history and democracy.
Paul	Krugman	Substack	https://paulkrugman.substack.com/feed	Nobel Prize-winning economist writing about economics, policy, and U.S. politics.
Matt	Levine	Bloomberg	https://www.bloomberg.com/opinion/authors/ARbTQlRLRjE/matthew-s-levine.rss	Former Goldman Sachs banker covering Wall Street, finance, and corporate law with wit.
Andrew	Sullivan	Substack (The Weekly Dish)	https://andrewsullivan.substack.com/feed	Political commentator exploring politics, culture, and philosophy from a conservative perspective.
Ben	Thompson	Stratechery	https://stratechery.com/feed/	Business and technology analyst focusing on strategy and the impact of technology.
John	Gruber	Daring Fireball	https://daringfireball.net/feeds/main	Technology blogger and creator of Markdown, primarily covering Apple and design.
Cory	Doctorow	Pluralistic	https://pluralistic.net/feed/	Science fiction author and activist writing about technology, copyright, and digital rights.
Casey	Newton	Platformer	https://www.platformer.news/feed	Tech journalist covering the intersection of social media platforms and democracy.
Jason	Kottke	kottke.org	https://feeds.kottke.org/main	Pioneering blogger since 1998 covering culture, technology, science, and the web.
Maria	Popova	The Marginalian	https://www.themarginalian.org/feed/	Writer exploring literature, science, art, and philosophy in search of meaning.
Anne	Applebaum	Substack (Open Letters)	https://anneapplebaum.substack.com/feed	Pulitzer Prize-winning historian writing about democracy, autocracy, and international affairs.
Zeynep	Tufekci	Substack (Insight)	https://zeynep.substack.com/feed	Sociologist analyzing technology, society, and social movements.
Noah	Smith	Substack (Noahpinion)	https://noahpinion.substack.com/feed	Economist writing about economics, technology, geopolitics, and culture.
Bari	Weiss	The Free Press	https://www.thefp.com/feed	Journalist and founder of The Free Press covering culture, politics, and free expression.
Charlie	Warzel	Substack (Galaxy Brain)	https://warzel.substack.com/feed	Atlantic staff writer exploring the internet, media, politics, and technology's impact on culture.
Scott	Alexander	Substack (Astral Codex Ten)	https://astralcodexten.substack.com/feed	Psychiatrist writing about rationality, science, medicine, and society.
Matt	Yglesias	Substack (Slow Boring)	https://www.slowboring.com/feed	Policy journalist covering politics, economics, and public policy with a progressive lens.
Emily	Oster	Substack (ParentData)	https://parentdata.org/feed	Economist providing data-driven analysis on parenting and pregnancy decisions.
Ted	Gioia	Substack (The Honest Broker)	https://tedgioia.substack.com/feed	Music historian and critic writing about music, culture, and the creative arts.
Ryan	Broderick	Substack (Garbage Day)	https://www.garbageday.email/feed	Internet culture writer tracking memes, platforms, and digital trends.
Molly	White	Substack (Citation Needed)	https://citationneeded.news/feed	Software engineer and writer covering cryptocurrency, web3, and tech accountability.
Ethan	Mollick	Substack (One Useful Thing)	https://www.oneusefulthing.org/feed	Wharton professor exploring artificial intelligence's implications for work and education.
Derek	Thompson	The Atlantic	https://www.theatlantic.com/feed/author/derek-thompson/	Atlantic staff writer covering economics, technology, and culture.
Freddie	deBoer	Substack	https://freddiedeboer.substack.com/feed	Writer and education researcher covering politics, culture, and education from the left.
Glenn	Greenwald	Substack	https://greenwald.substack.com/feed	Journalist and author covering civil liberties, national security, and media criticism.
Jesse	Singal	Substack (Singal-Minded)	https://jessesingal.substack.com/feed	Journalist covering social science, psychology, and cultural controversies.
John	Cochrane	Substack (The Grumpy Economist)	https://johnhcochrane.substack.com/feed	Stanford economist writing about finance, monetary policy, and free markets.
Tyler	Cowen	Marginal Revolution	https://marginalrevolution.com/feed	George Mason economist blogging about economics, culture, food, and travel.
Arnold	Kling	Substack (In My Tribe)	https://arnoldkling.substack.com/feed	Economist exploring economics, politics, and the sociology of beliefs.
Matthew	Yglesias	Vox (original)	https://www.vox.com/authors/matthew-yglesias/rss	Co-founder of Vox covering policy and politics (in addition to his Substack).
Hamilton	Nolan	Substack (How Things Work)	https://www.hamiltonnolan.com/feed	Labor journalist covering unions, class, and economic inequality.
Lili	Loofbourow	Slate	https://slate.com/author/lili-loofbourow/rss	Critic and culture writer covering gender, politics, and the intersection of culture and power.
Ed	Yong	The Atlantic	https://www.theatlantic.com/feed/author/ed-yong/	Science journalist covering biology, ecology, and pandemic preparedness.
Clive	Thompson	Blog	https://clivethompson.medium.com/feed	Technology writer and author exploring how technology shapes thinking and society.
Paul	Graham	paulgraham.com	http://www.paulgraham.com/rss.html	Y Combinator co-founder writing essays on startups, programming, and ideas.
Seth	Godin	seths.blog	https://seths.blog/feed/	Marketing expert and author writing daily about marketing, leadership, and change.
Austin	Kleon	Blog	https://austinkleon.com/feed/	Writer and artist sharing ideas about creativity, art, and living a creative life.
Tim	Urban	Wait But Why	https://waitbutwhy.com/feed	Writer creating long-form illustrated posts on topics from AI to procrastination.
Kevin	Drum	Jabberwocking	https://jabberwocking.com/feed/	Political blogger covering policy, data analysis, and current events.
James	Fallows	Substack (Breaking the News)	https://fallows.substack.com/feed	Atlantic national correspondent covering politics, aviation, and American society.
Megan	McArdle	Washington Post	https://www.washingtonpost.com/people/megan-mcardle/?outputType=rss	Washington Post opinion columnist covering economics, business, and policy.
Dan	Drezner	Substack (Drezner's World)	https://danieldrezner.substack.com/feed	International relations professor writing about foreign policy and pop culture.
Elizabeth	Bruenig	The Atlantic	https://www.theatlantic.com/feed/author/elizabeth-bruenig/	Opinion writer covering religion, politics, criminal justice, and culture.
Will	Wilkinson	Substack (Model Citizen)	https://modelcitizen.substack.com/feed	Writer exploring liberalism, democracy, and political philosophy.
Tressie McMillan	Cottom	Substack	https://tressiemcphd.substack.com/feed	Sociologist writing about race, gender, capitalism, and higher education.
Joshua	Topolsky	Substack (Untitled)	https://www.untitled.email/feed	Tech journalist and former Verge editor-in-chief covering technology and media.
Ben	Collins	NBC News Digital	https://www.nbcnews.com/author/ben-collins/feed	Reporter covering disinformation, extremism, and the internet's dark corners.
Julia	Angwin	The Markup	https://themarkup.org/feeds/author/julia-angwin.rss	Investigative journalist covering technology, privacy, and algorithmic accountability.
Spencer	Ackerman	Substack (Forever Wars)	https://foreverwars.substack.com/feed	National security journalist covering terrorism, surveillance, and U.S. foreign policy.
Jamelle	Bouie	New York Times	https://www.nytimes.com/by/jamelle-bouie/rss.xml	NYT opinion columnist covering history, politics, and race in America.
TSV

    import_from_tsv(tsv_data)
  end

  def import_from_tsv(tsv_data)
    created_feeds = 0
    created_authors = 0
    updated_authors = 0
    skipped_feeds = 0
    errors = []

    tsv_data.each_line do |line|
      line = line.strip
      next if line.empty?

      parts = line.split("\t")
      next if parts.length < 5

      first_name = parts[0]&.strip
      last_name = parts[1]&.strip
      publication = parts[2]&.strip
      feed_url = parts[3]&.strip
      description = parts[4]&.strip

      next if feed_url.nil? || feed_url.empty?

      full_name = "#{first_name} #{last_name}".strip

      begin
        # Create or find the feed
        feed = Feed.find_by(url: feed_url)
        if feed
          puts "  [SKIP] Feed already exists: #{feed_url}"
          skipped_feeds += 1
        else
          feed = Feed.create!(url: feed_url)
          puts "  [NEW] Feed created: #{feed_url}"
          created_feeds += 1
        end

        # Create or update the author
        author = Author.find_by(name: full_name)
        if author
          # Update bio if it was empty or different
          changed = false
          if author.bio.nil? || author.bio.empty?
            author.bio = description
            changed = true
          end
          # Always ensure featured is true for imported authors
          unless author.featured
            author.featured = true
            changed = true
          end
          if changed
            author.save!
            puts "  [UPDATE] Author updated: #{full_name}"
            updated_authors += 1
          else
            puts "  [SKIP] Author already exists with bio: #{full_name}"
          end
        else
          author = Author.create!(
            name: full_name,
            bio: description,
            featured: true
          )
          puts "  [NEW] Author created: #{full_name}"
          created_authors += 1
        end

      rescue => e
        error_msg = "Error processing #{full_name} (#{feed_url}): #{e.message}"
        puts "  [ERROR] #{error_msg}"
        errors << error_msg
      end
    end

    puts "\n" + "=" * 50
    puts "IMPORT COMPLETE"
    puts "=" * 50
    puts "Feeds created: #{created_feeds}"
    puts "Feeds skipped (already exist): #{skipped_feeds}"
    puts "Authors created: #{created_authors}"
    puts "Authors updated: #{updated_authors}"
    puts "Errors: #{errors.length}"

    if errors.any?
      puts "\nErrors:"
      errors.each { |e| puts "  - #{e}" }
    end
  end

  def import_from_csv(csv_data)
    created_feeds = 0
    created_authors = 0
    updated_authors = 0
    skipped_feeds = 0
    errors = []

    CSV.parse(csv_data, headers: true) do |row|
      feed_url = row['RSS Feed']&.strip
      first_name = row['First Name']&.strip
      last_name = row['Last Name']&.strip
      publication = row['Publication']&.strip
      description = row['Description']&.strip

      next if feed_url.nil? || feed_url.empty?

      full_name = "#{first_name} #{last_name}".strip

      begin
        # Create or find the feed
        feed = Feed.find_by(url: feed_url)
        if feed
          puts "  [SKIP] Feed already exists: #{feed_url}"
          skipped_feeds += 1
        else
          feed = Feed.create!(url: feed_url)
          puts "  [NEW] Feed created: #{feed_url}"
          created_feeds += 1
        end

        # Create or update the author
        author = Author.find_by(name: full_name)
        if author
          # Update bio if it was empty or different
          changed = false
          if author.bio.nil? || author.bio.empty?
            author.bio = description
            changed = true
          end
          # Always ensure featured is true for imported authors
          unless author.featured
            author.featured = true
            changed = true
          end
          if changed
            author.save!
            puts "  [UPDATE] Author updated: #{full_name}"
            updated_authors += 1
          else
            puts "  [SKIP] Author already exists with bio: #{full_name}"
          end
        else
          author = Author.create!(
            name: full_name,
            bio: description,
            featured: true
          )
          puts "  [NEW] Author created: #{full_name}"
          created_authors += 1
        end

      rescue => e
        error_msg = "Error processing #{full_name} (#{feed_url}): #{e.message}"
        puts "  [ERROR] #{error_msg}"
        errors << error_msg
      end
    end

    puts "\n" + "=" * 50
    puts "IMPORT COMPLETE"
    puts "=" * 50
    puts "Feeds created: #{created_feeds}"
    puts "Feeds skipped (already exist): #{skipped_feeds}"
    puts "Authors created: #{created_authors}"
    puts "Authors updated: #{updated_authors}"
    puts "Errors: #{errors.length}"

    if errors.any?
      puts "\nErrors:"
      errors.each { |e| puts "  - #{e}" }
    end
  end
end
