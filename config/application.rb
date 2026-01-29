require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require 'google_maps_service'
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

Dotenv::Railtie.load unless Rails.env.production?


module ByLine
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    # config.load_defaults 5.1
    # config.logger = Logger.new(STDOUT)
    # config.log_formatter = Logger::SimpleFormatter.new

    config.autoload_paths << "#{Rails.root}/app/errors"
    config.autoload_paths << "#{Rails.root}/app/lib"
    # config.autoload_paths << "#{Rails.root}/app/constants"

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.exceptions_app = self.routes
    # Don't generate system test files.
    config.generators.system_tests = nil
    
    
    # config.after_initialize takes a block which will be run after Rails has finished initializing the application. 
    # That includes the initialization of the framework itself
    # config.after_initialize do
    #   # load pages into the db
    # # ....
    # end

  end
end
