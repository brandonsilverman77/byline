module Types
  class UserType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    
    global_id_field :id
    field :email, String, null: true
    field :db_id, Integer, null: false
    field :superadmin, Boolean, null: false

    def db_id
      object.id
    end
  end
end
