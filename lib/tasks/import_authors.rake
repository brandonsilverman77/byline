require 'csv'

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
          if author.bio.nil? || author.bio.empty?
            author.bio = description
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
