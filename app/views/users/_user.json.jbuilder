json.user_id user.id
json.email user.email
json.bio user.bio
# json.visits user.visits

json.visits do
  json.array! user.visits, partial: "api/visits/visit", as: :visit
end
