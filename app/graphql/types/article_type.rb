module Types
  class ArticleType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    
    global_id_field :id
    field :title, String, null: true
    field :decription, String, null: true
    field :link, String, null: true
    field :domain_id, Integer, null: true
    field :feed_id, Integer, null: true
    field :author_ids, [Integer], null: false
    field :db_id, Integer, null: false

    def author_ids
      object.author_articles.collect(&:author_id)
    end

    def db_id
      object.id
    end
  end
end
