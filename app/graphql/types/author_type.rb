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
    field :object_id, Integer, null: false
    
    def object_id
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
  end
end
