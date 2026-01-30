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

    # Get the raw byline string from the authors
    raw_byline = authors.map(&:name).join(', ')

    # Match against featured authors
    featured_matches = Author.match_byline_to_featured(raw_byline)

    # If we found featured author matches, link them to the article
    if featured_matches.any?
      featured_matches.each do |featured_author|
        # Avoid duplicates
        unless article.authors.include?(featured_author)
          article.authors << featured_author
        end
      end
      logger.info "Matched article '#{article.title&.truncate(50)}' to featured authors: #{featured_matches.map(&:name).join(', ')}"
    end

    # Also keep the original author associations (the raw byline authors)
    authors.each do |author|
      unless article.authors.include?(author)
        article.authors << author
      end
    end

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
