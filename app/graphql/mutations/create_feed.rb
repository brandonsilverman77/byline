class Mutations::CreateFeed < Mutations::BaseMutation
  # null true

  argument :url, String, required: true

  field :feed, Types::FeedType, null: true
  field :errors, [String], null: false

  def resolve(url:)
    feed = Feed.find_by(url: url)
    if feed.nil?
      feed = Feed.new url: url
      result = feed.validate_and_save!
    else 
      result = {success: true, feed: feed}
    end
    
    if result[:success]
      # Successful creation, return the created object with no errors
      {
        feed: result[:feed],
        errors: [],
      }
    else
      raise GraphQL::ExecutionError.new result[:error]
      # Failed save, return the errors to the client

    end
  end
end