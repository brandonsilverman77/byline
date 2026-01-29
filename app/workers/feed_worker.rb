class FeedWorker
  include Sidekiq::Worker

  def perform(feed_id)
    feed = Feed.find feed_id
    reader = RSSReader.new
    begin 
      results = reader.read feed.url
      feed.process_results results
    rescue => e
      ## TODO: log errors to feed
    end
  end
end
