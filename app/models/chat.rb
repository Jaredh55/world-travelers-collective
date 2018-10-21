class Chat < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom

  def formattedcreated_at
    self.created_at.strftime("%A, %d %b %Y %l:%M %p")
  end
end
