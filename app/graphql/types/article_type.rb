module Types
  class ArticleType < Types::BaseObject
    implements GraphQL::Relay::Node.interface
    
    global_id_field :id
    field :title, String, null: true
    field :decription, String, null: true
    field :link, String, null: true
    field :domain_id, Integer, null: true
    field :feed_id, Integer, null: true
    field :author_ids, [Integer], null: false, resolve: ->(obj, args, ctx) do 
      obj.author_articles.collect(&:author_id)
    end
    field :object_id, Integer, null: false, resolve: ->(obj, args, ctx) do 
      obj.id
    end
  end
end
