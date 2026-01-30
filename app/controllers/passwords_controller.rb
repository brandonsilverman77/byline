class PasswordsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  # POST /password/reset - Request password reset email
  def create
    email = params[:email]

    if email.blank?
      return render json: { error: "Email is required" }, status: :unprocessable_entity
    end

    user = User.find_by(email: email.downcase.strip)

    if user
      # Generate JWT token that expires in 4 hours
      token = JWT.encode(
        { email: user.email, exp: 4.hours.from_now.to_i },
        Rails.application.secrets.JWT_SALT,
        'HS256'
      )

      # Send password reset email synchronously (avoid Sidekiq Redis issues)
      PasswordMailer.with(user: user, token: token).reset_password_email.deliver_now
    end

    # Always return success to prevent email enumeration
    render json: { success: true, message: "If an account exists with that email, you will receive a password reset link." }
  end

  # PATCH /password/update - Reset password with token
  def update
    token = params[:token]
    new_password = params[:password]

    if token.blank? || new_password.blank?
      return render json: { error: "Token and password are required" }, status: :unprocessable_entity
    end

    if new_password.length < 6
      return render json: { error: "Password must be at least 6 characters" }, status: :unprocessable_entity
    end

    begin
      decoded_token = JWT.decode(token, Rails.application.secrets.JWT_SALT, true, { algorithm: 'HS256' })
      email = decoded_token[0]["email"]
      user = User.find_by(email: email)

      if user
        user.password = new_password
        user.save!
        render json: { success: true, message: "Password updated successfully" }
      else
        render json: { error: "User not found" }, status: :not_found
      end
    rescue JWT::ExpiredSignature
      render json: { error: "This reset link has expired. Please request a new one." }, status: :unprocessable_entity
    rescue JWT::DecodeError
      render json: { error: "Invalid reset link" }, status: :unprocessable_entity
    end
  end
end
