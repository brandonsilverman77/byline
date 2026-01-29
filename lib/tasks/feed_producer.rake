desc "This task is called by the Heroku scheduler add-on"
task :feed_producer => :environment do
  puts "Queueing feeds.."
  Feed.fetch_all
  puts "done."
end

