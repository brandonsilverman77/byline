class CreateEmailSends < ActiveRecord::Migration[5.2]
  def change
    create_table :email_sends do |t|
      t.references :user
      t.timestamps
    end
  end
end
