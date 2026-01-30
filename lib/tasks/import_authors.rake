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
