class CreateEmailSendArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :email_send_articles do |t|
      t.references :email_send
      t.references :article
      t.timestamps
    end
  end
end
