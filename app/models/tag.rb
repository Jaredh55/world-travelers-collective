class Tag < ApplicationRecord
  validates :name, uniqueness: true

  has_many :post_tags
  has_many :posts, through: :post_tags
end
