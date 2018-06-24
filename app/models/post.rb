class Post < ApplicationRecord
  belongs_to :visit
  has_one :user, through: :visit
  has_many :votes, :as => :votable
  has_one :city, through: :visit
  has_many :comments
  has_many :post_tags
  has_many :tags, through: :post_tags
  has_many :images

  def show_tags
    tag_name_array = []
    tags.each do |tag|
      tag_name_array << tag.name
    end
    tag_name_array.join(", ")
  end

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
    posts = self.all
    posts.sort_by {|post| post.score}
  end

  def self.sort_by_score_desc
    posts = self.all
    posts.sort_by {|post| post.score }.reverse
  end
end
