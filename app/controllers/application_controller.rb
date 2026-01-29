require 'json'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :check_head

  
  def check_head 
    if request.head?
      head :ok
    end
  end
  
  def viewer
    warden.user
  end

  def warden
    request.env['warden']
  end

  def home(props = {})
    @store_props = {}
    render "welcome/index"
  end

  def validate_user
    if !current_user
      not_found
    end
  end

  def validate_superadmin
    unless current_user && current_user.superadmin?
      not_found
    end
  end
  
  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

end
