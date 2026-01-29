module Mutations
  class AddTwitterAccountToAuthor < Mutations::BaseMutation
    
    argument :author_id, Integer, required: true
      argument :twitter_url_or_name, String, required: true

      field :author, Types::AuthorType, null: true
      field :errors, [String], null: false

      def resolve(author_id:, twitter_url_or_name:)
        author = Author.find(author_id)
        author.add_twitter_account twitter_url_or_name
        {
          author: author,
          errors: [],
        }
      end
  end
end
