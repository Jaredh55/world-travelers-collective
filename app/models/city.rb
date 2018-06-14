class City < ApplicationRecord
  belongs_to :country
  has_many :visits
  has_many :posts, through: :visits
end
