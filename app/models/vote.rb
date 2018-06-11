class Vote < ApplicationRecord
  validates :user_id, uniqueness: {scope: [:votable_id, :votable_type], message: "one vote per item"}

  belongs_to :user
  belongs_to :votable, :polymorphic => true
end
