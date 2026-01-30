module Types
  class DomainType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    
    global_id_field :id
    field :host, String, null: true
    field :db_id, Integer, null: false

    def db_id
      object.id
    end
  end
end
