json.post_id @post.id
json.title @post.title
json.content @post.content
json.latitude @post.latitude
json.longitude @post.longitude
json.visit @post.visit
json.user @post.user
json.city @post.visit.city
json.country @post.city.country
json.votes @post.votes
json.votecount @post.votes.count
json.score @post.score
# json.comments @post.comments

json.comments do
  json.array! @post.comments, partial: "api/comments/comment", as: :comment
end

# json.comments do |comment|
#   json.user @post.comment.user
#   json.content @post.comment.content
# end