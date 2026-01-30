module Types
  class AuthorType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    
    global_id_field :id
    field :name, String, null: true
    field :twitter_handle, String, null: true
    field :bio, String, null: true
    field :image_url, String, null: true
    field :twitter_profile_image_url, String, null: true
    field :twitter_id, String, null: true
    field :featured, Boolean, null: false
    field :object_id, Integer, null: false, resolver_method: :resolve_object_id, method_conflict_warning: false

    def resolve_object_id
      object.id
    end

    field :articles, ArticleType.connection_type, null: false
    field :category_ids, [Integer], null: false
    
    def category_ids
      object.author_categories.pluck(:category_id)
    end
    
    field :subscribed, Boolean, null: false
    
    def subscribed
      viewer = context[:viewer]
      return false if viewer.nil?
      viewer.is_subscribed? to: object
    end
    
    field :domains, DomainType.connection_type, null: false

    def domains
      object.domains
    end

    field :articles_per_week, Float, null: false, description: "Average number of articles published per week"

    def articles_per_week
      # Get articles from the last 90 days to calculate a reliable average
      recent_articles = object.articles.where('published_at > ?', 90.days.ago)
      count = recent_articles.count

      return 0.0 if count == 0

      # Calculate weeks (90 days = ~12.86 weeks)
      weeks = 90.0 / 7.0
      (count / weeks).round(1)
    end
  end
end
