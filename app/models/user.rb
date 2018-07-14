class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true


  has_many :visits
  has_many :posts, through: :visits
  has_many :votes
  has_many :comments
  has_many :chatroom_users
  has_many :chatrooms, through: :chatroom_users
  has_many :chats

  has_attached_file :user_image, styles: {
    small: '100x100#',
    Large: '300x300#'
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

  def user_level
    if user_score < 5
      level = "Newbie"
    elsif user_score < 10
      level = "Traveler"
    elsif user_score < 15
      level = "Globetrotter"
    elsif user_score < 20
      level = "Nomad"
    elsif user_score > 19
      level = "Marco Polo"
    end
      
    return level
  end

  # def show_posts
  #   posts.each do |post|
  # end
end
