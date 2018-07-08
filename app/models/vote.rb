class Vote < ApplicationRecord
  validates :user_id, uniqueness: {scope: [:votable_id, :votable_type], message: "one vote per item"}

  belongs_to :user
  belongs_to :votable, :polymorphic => true

  def post 
    if votable_type == "Post"
      Post.find(votable_id)
    end
  end

  def comment
    if votable_type == "Comment"
      Comment.find(votable_id)
    end
  end
end
