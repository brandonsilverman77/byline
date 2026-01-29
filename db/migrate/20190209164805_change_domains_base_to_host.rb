class ChangeDomainsBaseToHost < ActiveRecord::Migration[5.2]
  def change
    rename_column :domains, :base, :host
  end
end
