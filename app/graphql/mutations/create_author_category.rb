module Mutations
  class CreateAuthorCategory < Mutations::BaseMutation
    argument :author_id, Integer, required: true
    argument :category_ids, [Integer], required: true

    field :author, Types::AuthorType, null: true
    field :errors, [String], null: false

    def resolve(author_id:, category_ids:)
      author = Author.find(author_id)
      author.author_categories.destroy_all
      if !category_ids.nil?
        category_ids.each do |cid|
          author.author_categories.build(category_id: cid).save
        end
      end
      {
        author: author,
        errors: [],
      }
    end
  end
end
