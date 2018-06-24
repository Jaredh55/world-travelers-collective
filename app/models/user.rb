class User < ApplicationRecord
  has_secure_password

  has_many :visits
  has_many :posts, through: :visits
  has_many :votes
  has_many :comments

  # def show_posts
  #   posts.each do |post|
  # end
end
