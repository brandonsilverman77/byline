require 'uri'
class TwitterLib
  
  attr_accessor :client
  
  def initialize(params = {})
    self.client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.secrets.TWITTER_CONSUMER_KEY
      config.consumer_secret     = Rails.application.secrets.TWITTER_CONSUMER_KEY_SECRET
      config.access_token        = Rails.application.secrets.TWITTER_ACCESS_TOKEN
      config.access_token_secret = Rails.application.secrets.TWITTER_ACCESS_TOKEN_SECRET
    end
  end
  
  def get_user(url_or_username)
    unless url_or_username.match /twitter\.com/
      url_or_username = "twitter.com/#{url_or_username}"
    end 
    unless url_or_username.match /http/
      url_or_username = "https://#{url_or_username}"
    end  
    url_or_username.strip!
    url_or_username = url_or_username.gsub(/^@/, '')
    
    username = URI(url_or_username).path.gsub(/^\//, '')
      
    client.user username
  end
  

  
  
end