module Types
  class DomainType < Types::BaseObject
    implements GraphQL::Relay::Node.interface
    
    global_id_field :id
    field :host, String, null: true
    field :object_id, Integer, null: false, resolve: ->(obj, args, ctx) do 
      obj.id
    end    
  end
end
