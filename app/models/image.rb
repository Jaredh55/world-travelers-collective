class Image < ApplicationRecord
  belongs_to :post
  
  has_attached_file :image, styles: { small: "64x64", med: "100x100", large: "200x200" }

  validates_attachment :image,
    content_type: {
      content_type: ["image/jpeg", "image/gif", "image/png"]
    }

end
