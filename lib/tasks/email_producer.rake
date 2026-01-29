desc "This task is called by the Heroku scheduler add-on"
task :email_producer => :environment do
  puts "Queueing emails.."
  User.send_all
  puts "done."
end

