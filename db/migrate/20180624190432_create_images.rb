class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :caption
      t.integer :post_id
      t.attachment :image

      t.timestamps
    end
  end
end
