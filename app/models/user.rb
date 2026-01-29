class User < ApplicationRecord
	has_secure_password
	has_many :email_sends
	has_many :user_authors
	has_many :authors, through: :user_authors
  
	enum permission_level: { user: 0, superadmin: 1 }
	enum status: { inactive: 0, active: 1 }


  def self.login_with_password(params)
    if !params[:email]
      raise LoginError.new "You must enter an email."
    end

    if !params[:password] || params[:password].length < 2
      raise LoginError.new "You must enter a password."
    end

    u = User.find_by(email: params[:email])
    if u
      # we have a user, either validate the password or the social media account
      auth_result = u.authenticate params[:password]
      if !auth_result
        raise LoginError.new "Either the email or password is incorrect."
      else
        # we have a valid user
				# logger.info "saving #{params.to_json}"
        # u.update params
        return u
      end
    else ## we have a new user
      u = User.new params
      u.save
      return u
    end
  end
	
	def superadmin
		superadmin?
	end

	def as_json(options)
		super.as_json(:except => [:password_digest])
	end
	
	def update_password(params) 
		old_password = params[:old_password]
		token = params[:token]
		new_password = params[:new_password]
		new_password_confirmation = params[:new_password_confirmation]
		
		if old_password && old_password.length > 0
			auth_result = authenticate old_password
      if !auth_result
        raise LoginError.new "This isn't the password you provided originally."
      end
		elsif token
			begin
	      decoded_token = JWT.decode token, Rails.application.secrets.JWT_SALT, true, { algorithm: 'HS256' }
	      paload = decoded_token[0];
	      token_user = User.find_by email: decoded_token[0]["email"]
	      if self.id != token_user.id
	        raise LoginError.new "This token doesn't belong to you. Tsk Tsk."
	      end
	    rescue JWT::ExpiredSignature
	      raise LoginError.new "Oops. You waited a little too long. You have four hours to change your password after requesting a reset."
	    end
		elsif new_password != new_password_confirmation
			raise LoginError.new "Shoot! Your password confirmation doesn't match your new password."
		end
		
		self.password = new_password
		self.save
	end
	
	def self.send_all
		# only try to send emails to users with authors
		User.joins(:user_authors).joins(:authors).where(status: :active).group(:id).each do |u|
			u.send_digest
		end
	end
	
	def send_digest 
		DigestMailer.with(user_id: self.id).digest_email.deliver_later
	end
	
	def is_subscribed?(params)
		author = params[:to]
		self.authors.include? author
	end

  private

end
