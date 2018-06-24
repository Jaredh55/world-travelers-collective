json.user_id user.id
json.email user.email
json.bio user.bio
json.current_user @current_user_id
# json.visits user.visits

json.visits do
  json.array! user.visits, partial: "api/visits/visit", as: :visit
end

json.comments do
  json.array! user.comments, partial: "api/comments/comment", as: :comment
end

json.posts do
  json.array! user.posts
end
