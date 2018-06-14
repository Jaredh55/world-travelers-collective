class Visit < ApplicationRecord
  belongs_to :user
  has_many :posts
  belongs_to :city
end
