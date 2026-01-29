class ByLineSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
  
  def self.id_from_object(object, type_definition, query_ctx)
    # Call your application's UUID method here
    # It should return a string
    GraphQL::Schema::UniqueWithinType.encode(object.class.name, object.id)
  end

  def self.object_from_id(id, query_ctx)
    class_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    # "Post" => Post.find(item_id)
    Object.const_get(class_name).find(item_id)
  end
  
  # You'll also need to define `resolve_type` for
  # telling the schema what type Relay `Node` objects are
  def self.resolve_type(type, obj, ctx)
     case obj
     when Feed
       Types::FeedType
     when User
       Types::UserType
     when Domain
       Types::DomainType
     when Author
       Types::AuthorType
     else
       raise("Unexpected object: #{obj}")
     end
   end
end
