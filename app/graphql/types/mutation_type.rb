module Types
  class MutationType < Types::BaseObject
    field :addTwitterAccountToAuthor, mutation: Mutations::AddTwitterAccountToAuthor
    field :subscribe_to_author, mutation: Mutations::SubscribeToAuthor
    field :login, mutation: Mutations::Login
    field :create_feed, mutation: Mutations::CreateFeed
    field :create_author_category, mutation: Mutations::CreateAuthorCategory
    field :feature_author, mutation: Mutations::FeatureAuthor
    field :request_an_author, mutation: Mutations::RequestAnAuthor
  end
end
