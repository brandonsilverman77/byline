class CreateArticles < ActiveRecord::Migration[5.2]
  def up
    create_table :articles do |t|
      t.string :uid
      t.string :title
      t.string :description
      t.string :body
      t.string :link
      t.references :author
      t.references :domain
      t.references :feed
      t.timestamps
    end
    
    add_index(:articles, :uid, unique: true)
  end
  
  def down 
    drop_table :articles
    remove_index(:articles, :uid)
  end
end
