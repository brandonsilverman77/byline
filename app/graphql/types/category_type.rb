module Types
  class CategoryType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    
    global_id_field :id
    field :db_id, Integer, null: false
    field :label, String, null: true

    def db_id
      object.id
    end
  end
end
