class Chatroom < ApplicationRecord
  has_many :chatroom_users
  has_many :users, through: :chatroom_users
  has_many :chats

  def formattedcreated_at
    self.created_at.strftime("%A, %d %b %Y %l:%M %p")
  end
end
