json.city visit.city
json.country visit.city.country
json.id visit.id
json.start_date visit.start_date
json.end_date visit.end_date
# json.posts visit.posts #start here

json.posts do
  json.array! visit.posts, partial: "api/posts/post", as: :post
end
