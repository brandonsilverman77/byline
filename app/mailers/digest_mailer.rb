class DigestMailer < ApplicationMailer
  default from: 'ByLine <notifications@joinbyline.com>'

  def digest_email
    @user = User.find(params[:user_id])
    
    unless EmailSend.occurred_today for: @user
      @articles = Article.find_for @user
      # don't sent empty emails
      if @articles && !@articles.empty?
        logger.info "Sending digest to #{@user.email}"
        
        ## TODO: design email
        mail(to: @user.email, subject: 'Byline Daily Digest')
        
        log = EmailSend.create user: @user
        log.articles << @articles
      else 
        logger.info "No new articles for #{@user.email}"
      end
    end
    
    
  end
  
  def test_digest_email
    @user = User.find(params[:user_id])
    @articles = Article.order('RANDOM()').limit(4)
    logger.info "Sending digest to #{@user.email}"
    mail(to: @user.email, subject: 'Byline Daily Digest', :template_name => "digest_email")
  end

end
