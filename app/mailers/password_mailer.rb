class PasswordMailer < ApplicationMailer
  default from: 'notifications@boncandles.com'

  def reset_password_email
    @token = params[:token]
    mail(to: params[:user].email, subject: 'Bon Candles Password Reset [Expires Soon].')
  end

end
