class Types::FeedType < Types::BaseObject
  implements GraphQL::Types::Relay::Node
  
  global_id_field :id
  field :object_id, Integer, null: false, resolver_method: :resolve_object_id, method_conflict_warning: false
  field :url, String, null: false

  def resolve_object_id
    object.id
  end
end
