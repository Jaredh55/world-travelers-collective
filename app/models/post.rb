class Post < ApplicationRecord
  belongs_to :visit
  has_many :votes, :as => :votable
end
