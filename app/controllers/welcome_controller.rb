class WelcomeController < ApplicationController
  layout 'vite'

  def index
    render 'welcome/vite'
  end
  
  def logout 
    warden.logout
    redirect_to "/"
  end
  
  def test 
    if viewer && viewer.superadmin?
      DigestMailer.with(user_id: viewer.id).test_digest_email.deliver
    end
    respond_to do |f|
      f.html
    end
  end
  
  def unsubscribe
    viewer.inactive!
    respond_to do |f|
      f.html
    end
  end
  
end