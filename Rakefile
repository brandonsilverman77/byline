# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

namespace :yarn do
  desc "Install all JavaScript dependencies as specified via Yarn"
  task :install do
    system('./bin/yarn')
  end
  task :webpack do 
    system('bundle exec ./bin/yarn webpack')
  end
end

Rake::Task['assets:precompile'].enhance [ 'yarn:webpack' ]