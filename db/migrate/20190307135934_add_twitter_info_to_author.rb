class AddTwitterInfoToAuthor < ActiveRecord::Migration[5.2]
  def change
    add_column :authors, :twitter_id, :integer
    add_column :authors, :twitter_handle, :string
    add_column :authors, :twitter_profile_image_url, :string
  end
end
