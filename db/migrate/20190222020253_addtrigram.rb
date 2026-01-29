class Addtrigram < ActiveRecord::Migration[5.2]
  disable_ddl_transaction!
  
  def up
    enable_extension :pg_trgm
    
    execute "CREATE INDEX authors_on_name_idx ON authors USING gin(name gin_trgm_ops)"
  
  end
  
  def down 
    execute "DROP INDEX authors_on_name_idx"
    
  end
end
