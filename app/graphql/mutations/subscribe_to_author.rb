module Mutations
  class SubscribeToAuthor < Mutations::BaseMutation
    argument :author_id, Integer, required: true

    field :author, Types::AuthorType, null: true
    field :errors, [String], null: false

    def resolve(author_id:)
      author = Author.find(author_id)
      author.toggle_subscribe! context[:viewer]
      {
        author: author,
        errors: [],
      }
    end
  end
end
