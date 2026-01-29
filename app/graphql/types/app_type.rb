module Types
  class AppType < Types::BaseObject
  
    field :articles, ArticleType.connection_type, null: false
    field :authors, AuthorType.connection_type, null: false do 
       argument :search, String, required: false
       argument :categories, [Int], required: false
    end
    
    field :user, UserType, null: true
    field :categories, CategoryType.connection_type, null: true
    
    
    def user 
      context[:viewer] || context[:warden].user
    end
    
    def authors(params = {})
      Author.search params
    end
    
    def categories
      Category.all
    end
    
    def articles
      Article.all
    end
  end
end
