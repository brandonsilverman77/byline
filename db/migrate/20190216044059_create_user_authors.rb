class CreateUserAuthors < ActiveRecord::Migration[5.2]
  def change
    create_table :user_authors do |t|
      t.references :user
      t.references :author
      t.timestamps
    end
  end
end
