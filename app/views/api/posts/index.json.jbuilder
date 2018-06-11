json.array!@posts.each do |post|
  json.post_id post.id
  json.title post.title
  json.content post.content
  json.latitude post.latitude
  json.longitude post.longitude
  json.visit_id post.visit_id
end