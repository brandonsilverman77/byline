class CreateAuthors < ActiveRecord::Migration[5.2]
  def up
    create_table :authors do |t|
      t.string :name
      t.string :bio
      t.string :image_url
      t.timestamps
    end
    
    add_index(:authors, :name, unique: true)
  end
  
  def down 
    drop_table :authors
    remove_index(:authors, :name)
  end
end
