web: bundle exec puma -C config/puma.rb --early-hints
worker: bundle exec sidekiq -e production
release: bundle exec rake db:migrate