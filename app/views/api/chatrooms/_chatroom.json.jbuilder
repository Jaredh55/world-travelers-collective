#ONLY FOR USER SHOW AS NOT TO ENTER INFINITE LOOP
json.id chatroom.id
json.created_at chatroom.created_at

json.chatroom_users do
  json.array! chatroom.users
end