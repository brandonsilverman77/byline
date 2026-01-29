class EmailSend < ApplicationRecord
  belongs_to :user
  has_many :email_send_articles
  has_many :articles, through: :email_send_articles
  
  def self.occurred_today(params)
    user = params[:for]
    !user.email_sends.where("created_at > DATE(NOW())").empty?
  end
end
