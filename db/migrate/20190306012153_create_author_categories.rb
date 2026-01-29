class CreateAuthorCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :author_categories do |t|
      t.references :author
      t.references :category
      t.timestamps
    end
  end
end
