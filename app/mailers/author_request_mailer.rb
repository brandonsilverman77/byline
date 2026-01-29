class AuthorRequestMailer < ApplicationMailer
  default from: 'notifications@joinbyline.com'

  def request_email
      @name = params[:name]
      mail(to: ['brandon.silverman@gmail.com', 'mayer.georgep@gmail.com'], subject: 'Author Requested')
  end
end
