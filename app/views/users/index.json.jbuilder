json.array!@users.each do |user|
  json.user_id user.id
  json.username user.username
  json.bio user.bio
end