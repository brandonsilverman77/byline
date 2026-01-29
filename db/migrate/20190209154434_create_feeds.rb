class CreateFeeds < ActiveRecord::Migration[5.2]
  def change
    create_table :feeds do |t|
      t.string :url
      t.datetime :fetched_at
      t.timestamps
    end
  end
end
