json.id @chatroom.id
json.current_user_id @current_user_id

json.chats do
  json.array! @chatroom.chats, partial: "api/chats/chat", as: :chat
end

json.users do
  json.array! @chatroom.users, partial: "users/user", as: :user
end

