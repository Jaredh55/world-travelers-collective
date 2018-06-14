class Post < ApplicationRecord
  belongs_to :visit
  has_one :user, through: :visit
  has_many :votes, :as => :votable
  has_one :city, through: :visit 
end
