class Feed < ApplicationRecord  
  has_many :articles

  
  def self.fetch_all
    ## TODO: async
    # TODO: collect more info on the feed
    # batch = Sidekiq::Batch.new
    # batch.description = "Fetching all feeds..."
    # batch.jobs do
    #   self.all.each do |feed| 
    #     FeedWorker.perform_async(feed.id) 
    #   end
    # end
    
    self.all.each do |feed| 
      FeedWorker.perform_async(feed.id) 
    end
  end
  
  def fetch
    results = get_raw_results
    self.process_results results
  end
  
  def validate_and_save!
    
    begin 
      result = get_raw_results
      self.save
      {
        feed: self,
        success: true
      }
    rescue => e 
      {
        error: e.message,
        success: false
      }
    end
    
  end
    
  def process_results(results)
    results.each do |r|
      process_result r
    end
  end
  
  def process_result(result)
    authors = result.authors
    article = result.article
    domain = result.domain

    article.authors << authors 
    article.domain = domain 
    article.feed = self
    
    article.save
    
    logger.info "Saving #{article}..."
  end
  
  private 
  
  def get_raw_results
    reader = RSSReader.new
    results = reader.read self.url
  end

  
end
