Rails.application.routes.draw do  
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
    get "/graphql/introspection", to: "graphql#introspection"
  end
  post "/graphql", to: "graphql#execute"
  get '/', to: 'welcome#index'
  get '/logout', to: 'welcome#logout'
  get '/admin', to: 'welcome#index'
  get '/test', to: 'welcome#test'
  get '/about', to: 'welcome#index'
  get '/unsubscribe', to: 'welcome#unsubscribe'
  resources :feeds
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
