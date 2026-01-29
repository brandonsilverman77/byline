

desc "Generate GraphQL schema"
task :graphql_schema => :environment do
  result = ByLineSchema.execute(GraphQL::Introspection::INTROSPECTION_QUERY, {})
  
  File.delete("./schema.json") if File.exist?("./schema.json")
  
  File.open("./schema.json", 'w') do |f|
    f.puts result.to_json
  end
  
end

