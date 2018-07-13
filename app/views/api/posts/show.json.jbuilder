json.post_id @post.id
json.title @post.title
json.content @post.content
json.latitude @post.latitude
json.longitude @post.longitude
json.visit @post.visit
json.user @post.user
json.user_image @post.user.user_image.url(:small)
json.city @post.visit.city
json.country @post.city.country
json.tags @post.tags
json.show_tags @post.show_tags
json.votes @post.votes
json.votecount @post.votes.count
json.score @post.score
# json.commentcount @post.comments.count
json.current_user_id @current_user_id
json.post_image @post.post_image
json.post_image_medium @post.post_image.url(:medium)
json.post_image_square @post.post_image.url(:square)
json.post_image_thumb @post.post_image.url(:thumb)

# json.comments @post.comments

json.comments do
  json.array! @post.comments, partial: "api/comments/comment", as: :comment
end

# json.comments do |comment|
#   json.user @post.comment.user
#   json.content @post.comment.content
# end