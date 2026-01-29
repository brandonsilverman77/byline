module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    
    field :admin, Types::AdminType, null: false  
    field :app, Types::AppType, null: false  
    
    def admin 
      {}
    end 
    
    def app 
      {}
    end 
  end
end
