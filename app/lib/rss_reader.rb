require 'open-uri'


class RssReader
  
  def read(uri) 
    txt = open(uri).read
    feed = FeedParser::Parser.parse(txt)
    results = feed.items.collect do |i|
      parse i
    end
  
    results.compact
  end
  
  class Response 
    attr_accessor :authors, :domain, :article
    
    def initialize(params) 
      self.authors = params[:authors]
      self.domain = params[:domain]
      self.article = params[:article]
    end
    
    def to_s
      "Author: #{self.authors}, domain: #{self.domain}, article: #{self.article}"
    end
  end
  
  private 
  
  def parse(item)
    article = Article.from item
    
    if article.id.nil?
      authors = Author.from item
      domain = Domain.from item
      Response.new authors: authors, domain: domain, article: article
    else 
      nil
    end
    
  end
  
end