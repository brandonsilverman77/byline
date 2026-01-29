require 'uri'

class Domain < ApplicationRecord
  
  has_many :articles
  
  def self.from item 
    uri = URI(item.url)

    d = Domain.new host: uri.host
    
    existing = Domain.find_by host: d.host
    
    if existing 
      return existing
    end
    
    d.save 
    
    d
  end
  
  def to_s
    self.host
  end
  
end
