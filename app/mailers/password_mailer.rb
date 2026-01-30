class PasswordMailer < ApplicationMailer
  default from: 'Byline <hello@mg.joinbyline.com>'

  def reset_password_email
    @user = params[:user]
    @token = params[:token]
    @reset_url = "https://www.joinbyline.com/reset-password?token=#{@token}"

    mail(
      to: @user.email,
      subject: 'Reset your Byline password'
    )
  end
end
