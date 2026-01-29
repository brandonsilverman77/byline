class AddNewCategories < ActiveRecord::Migration[5.2]
  def up
    execute "INSERT INTO categories (label, created_at, updated_at) VALUES ('tech', NOW(), NOW()), ('culture', NOW(), NOW())";
    execute "UPDATE categories SET label = 'opinion' WHERE label = 'editorial'";
  end
  
  def down 
    execute "DELETE * FROM categories WHERE label IN ('culture', 'tech')";
    execute "UPDATE categories SET label = 'editorial' WHERE label = 'opinion'";

  end
end
