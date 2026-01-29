module Types
  class UserType < Types::BaseObject
    implements GraphQL::Relay::Node.interface
    
    global_id_field :id
    field :email, String, null: true
    field :object_id, Integer, null: false, resolve: ->(obj, args, ctx) do 
      obj.id
    end
    
    field :superadmin, Boolean, null: false
  end
end
