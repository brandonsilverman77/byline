module Types
  class AuthorType < Types::BaseObject
    implements GraphQL::Relay::Node.interface
    
    global_id_field :id
    field :name, String, null: true
    field :twitter_handle, String, null: true
    field :bio, String, null: true
    field :image_url, String, null: true
    field :twitter_profile_image_url, String, null: true
    field :twitter_id, String, null: true
    field :featured, Boolean, null: false
    field :object_id, Integer, null: false, resolve: ->(obj, args, ctx) do 
      obj.id
    end    
    
    field :articles, ArticleType.connection_type, null: false
    field :category_ids, [Integer], null: false, resolve: ->(obj, args, ctx) do 
        obj.author_categories.pluck(:category_id)
    end
    
    field :subscribed, Boolean, null: false, resolve: ->(obj, args, ctx) do 
      viewer = ctx[:viewer]
      if viewer.nil?
        return false
      end
      
      viewer.is_subscribed? to: obj
    end
    
    field :domains, DomainType.connection_type, null: false, resolve: ->(obj, args, ctx) do 
      obj.domains
    end
    
    
  end
end
