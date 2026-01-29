module Mutations
  class Login < Mutations::BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true
    
    field :app, Types::AppType, null: true
    field :errors, [String], null: false
    
    

    def resolve(email:, password:)
      begin 
        user = User.login_with_password email: email, password: password
        context[:warden].set_user(user)  
        {
          app: {},
          errors: [],
        }
      rescue LoginError => e 
        raise GraphQL::ExecutionError.new e.message
      end
    end
  end
end
