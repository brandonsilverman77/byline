class EmailSendArticle < ApplicationRecord
  belongs_to :email_send
  belongs_to :article
end
