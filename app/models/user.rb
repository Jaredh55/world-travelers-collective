class User < ApplicationRecord
  has_secure_password

  has_many :visits
  has_many :posts, through: :visits
  has_many :votes
  has_many :comments

  def user_score
    @points = 0
    posts.each do |post|
      @points = @points + post.score
    end

    comments.each do |comment|
      @points = @points + comment.score
    end

    return @points
  end

  # def show_posts
  #   posts.each do |post|
  # end
end
