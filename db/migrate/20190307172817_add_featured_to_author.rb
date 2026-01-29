class AddFeaturedToAuthor < ActiveRecord::Migration[5.2]
  def change
    add_column :authors, :featured, :boolean, default: false
  end
end
