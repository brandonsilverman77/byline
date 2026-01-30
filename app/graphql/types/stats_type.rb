module Types
  class StatsType < Types::BaseObject
    field :total_users, Integer, null: false
    field :active_users, Integer, null: false
    field :users_with_subscriptions, Integer, null: false
    field :total_subscriptions, Integer, null: false
    field :total_authors, Integer, null: false
    field :total_feeds, Integer, null: false

    # User lists
    field :all_users, [Types::UserType], null: false
    field :active_users_list, [Types::UserType], null: false
    field :users_with_subscriptions_list, [Types::UserType], null: false
    field :inactive_users_list, [Types::UserType], null: false

    def total_users
      User.count
    end

    def active_users
      User.where(status: :active).count
    end

    def users_with_subscriptions
      User.joins(:user_authors).distinct.count
    end

    def total_subscriptions
      UserAuthor.count
    end

    def total_authors
      Author.count
    end

    def total_feeds
      Feed.count
    end

    def all_users
      User.order(created_at: :desc)
    end

    def active_users_list
      User.where(status: :active).order(created_at: :desc)
    end

    def users_with_subscriptions_list
      User.joins(:user_authors).distinct.order(created_at: :desc)
    end

    def inactive_users_list
      User.where(status: :inactive).order(created_at: :desc)
    end
  end
end
