module Mutations
  class FeatureAuthor < Mutations::BaseMutation
    argument :author_id, Integer, required: true

    field :author, Types::AuthorType, null: true
    field :errors, [String], null: false

    def resolve(author_id:)
      author = Author.find(author_id)
      if !author.featured?
        author.featured!
      else 
        author.featured = false
        author.save
      end
        
    
      {
        author: author,
        errors: [],
      }
    end
  end
end
