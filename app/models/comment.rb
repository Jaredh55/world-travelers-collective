class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :votes, :as => :votable

  def upvotes
    votes.where(positive: true).count
  end

  def downvotes
    votes.where(positive: false).count
  end

  def score
    upvotes - downvotes
  end

  def self.sort_by_score_asc
    # posts = self.all
    # posts.sort_by do |post|
    #   post.score
    # end
    comments = self.all
    comments.sort_by {|comment| comment.score}
  end
end
