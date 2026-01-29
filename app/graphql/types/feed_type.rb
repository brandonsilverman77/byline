class Types::FeedType < Types::BaseObject
  implements GraphQL::Relay::Node.interface
  
  global_id_field :id
  field :object_id, Integer, null: false, resolve: ->(obj, args, ctx) do 
    obj.id
  end
  field :url, String, null: false

end