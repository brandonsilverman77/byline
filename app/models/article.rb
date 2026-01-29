class Article < ApplicationRecord
  
  has_many :author_articles
  has_many :authors, through: :author_articles
  has_many :email_send_articles
  has_many :email_sends, through: :email_send_articles
  belongs_to :feed
  belongs_to :domain
  
  def self.from item 
    uid = item.guid
    
    if !uid 
      uid = item.link
    end  
    
    
    a = Article.new title: item.title, description: item.description, body: item.content, link: item.url, uid: uid, published_at: item.published
    if a.uid 
      existing = self.find_by uid: a.uid
      if existing 
        return existing
      end
    end
    a
  end
  
  def self.find_for user
    ids = user.authors.pluck(:id)
    
    articles = self.joins(:author_articles)
      .where("author_articles.author_id IN (?)", ids)
      .where("articles.published_at > NOW() - INTERVAL '7' DAY")
      
    if articles.length > 0
      ## this should be a small set if any
      sent_articles = self
        .joins(:email_send_articles)
        .joins(:email_sends)
        .where("email_sends.user_id = ?", user.id)
        .where("articles.id IN (?)", articles.collect(&:id)).pluck(:id).to_set
      
      if sent_articles.length > 0
        articles = articles.select do |a|
          !sent_articles.include? a.id
        end
      end
    end
    
    articles
      
  end
  
  def to_s 
    "#{self.title}"
  end
  
  
  private 

end
