module Types
  class DomainType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    
    global_id_field :id
    field :host, String, null: true
    field :object_id, Integer, null: false, resolver_method: :resolve_object_id, method_conflict_warning: false

    def resolve_object_id
      object.id
    end
  end
end
