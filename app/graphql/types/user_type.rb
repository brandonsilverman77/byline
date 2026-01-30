module Types
  class UserType < Types::BaseObject
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :email, String, null: true
    field :object_id, Integer, null: false, resolver_method: :resolve_object_id, method_conflict_warning: false
    field :superadmin, Boolean, null: false
    field :status, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :subscription_count, Integer, null: false

    def resolve_object_id
      object.id
    end

    def subscription_count
      object.user_authors.count
    end
  end
end
