class AddPaperclipAttachment < ActiveRecord::Migration[5.1]
  def change
    add_attachment :posts, :post_image
  end
end
