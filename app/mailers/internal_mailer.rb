class InternalMailer < ApplicationMailer
  default from: 'notifications@boncandles.com'

  def generic
    @body = params[:body]
    @user = params[:user]
    subject = params[:subject]
    mail(to: 'mayer.georgep@gmail.com', subject: subject)
  end

end
