module Mutations
  class RequestAnAuthor < Mutations::BaseMutation
    argument :name, String, required: true

    field :errors, [String], null: false
    field :success, Boolean, null: false

    def resolve(name:)
      
      AuthorRequestMailer.with(name: name).request_email.deliver_later
      # author = Author.find(author_id)
      # if !author.featured?
      #   author.featured!
      # else 
      #   author.featured = false
      #   author.save
      # end
        
    
      {
        success: true,
        errors: []
      }
    end
  end
end
