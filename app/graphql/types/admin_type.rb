module Types
  class AdminType < Types::BaseObject

    field :feeds, FeedType.connection_type, null: false
    field :stats, Types::StatsType, null: false

    def feeds
      Feed.all
    end

    def stats
      {}
    end
  end
end
