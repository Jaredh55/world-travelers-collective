# json.array!@posts.each do |post|
#   json.post_id post.id
#   json.title post.title
#   json.content post.content
#   json.latitude post.latitude
#   json.longitude post.longitude
#   json.visit post.visit
#   json.user post.user
#   json.city post.visit.city
#   json.country post.city.country
#   json.tags post.tags
#   json.show_tags post.show_tags
#   json.votes post.votes
#   json.votecount post.votes.count
#   json.score post.score
#   json.commentcount post.comments.count
#   json.created_at post.created_at
#   json.post_image_thumb post.post_image.url(:thumb)
#   json.post_image_medium post.post_image.url(:medium)
#   json.post_image_square post.post_image.url(:square)
# end
# json.current_user_id @current_user_id
# json.current_user_chatmates @chatmates
json.countries @countries
json.tags @tags

json.cities do
  json.array! @cities
end

json.posts do
  json.array! @posts, partial: "api/posts/post", as: :post
end