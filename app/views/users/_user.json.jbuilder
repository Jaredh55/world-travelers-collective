json.user_id user.id
json.email user.email
json.bio user.bio
json.current_user_id @current_user_id
json.score user.user_score
json.user_level user.user_level
json.user_image_small user.user_image.url(:small)
json.user_image_Large user.user_image.url(:Large)
json.chatmates user.chatmates
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

json.chatrooms do
  json.array! user.chatrooms, partial: "api/chatrooms/chatroom", as: :chatroom
end
