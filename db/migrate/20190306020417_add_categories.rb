class AddCategories < ActiveRecord::Migration[5.2]
  def up
    execute "INSERT INTO categories (label, created_at, updated_at) VALUES ('sports', NOW(), NOW()), ('politics', NOW(), NOW()), ('editorial', NOW(), NOW())";
  end
  
  def down 
    execute "DELETE * FROM categories WHERE label IN ('sports', 'politics', 'editorial')";
  end
end
