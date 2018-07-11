class User < ApplicationRecord
  has_secure_password

  has_many :visits
  has_many :posts, through: :visits
  has_many :votes
  has_many :comments

  has_attached_file :user_image, styles: {
    small: '100x100>',
    # square: '200x200#',
    Large: '300x300>'
  }
    
  validates_attachment :user_image,
    content_type: {
      content_type: ["image/jpeg", "image/gif", "image/png"]
    }, size: { in: 0..5.megabytes }

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
