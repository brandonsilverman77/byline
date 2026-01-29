class CreateAuthorArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :author_articles do |t|
      t.references :author
      t.references :article
    end
    
    remove_column :articles, :author_id
  end
end
