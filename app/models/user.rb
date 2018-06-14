class User < ApplicationRecord
  has_secure_password

  has_many :visits
  has_many :votes
  has_many :posts, through: :visits
end
