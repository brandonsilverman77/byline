module Types
  class AdminType < Types::BaseObject
    
    field :feeds, FeedType.connection_type, null: false
  
    
    def feeds
      Feed.all
    end

  end
end
