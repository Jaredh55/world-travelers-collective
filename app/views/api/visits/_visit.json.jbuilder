json.city visit.city
json.country visit.city.country
# json.posts visit.posts #start here

json.posts do
  json.array! visit.posts, partial: "api/posts/post", as: :post
end
