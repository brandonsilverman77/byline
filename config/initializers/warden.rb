Rails.application.config.middleware.insert_after Rack::ETag, Warden::Manager do |manager|
  manager.failure_app = GraphqlController

  manager.serialize_into_session do |user|
    user.id
  end

  manager.serialize_from_session do |id|
    User.find(id)
  end
end