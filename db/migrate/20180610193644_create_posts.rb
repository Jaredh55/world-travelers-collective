class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.string :latitude
      t.string :longitude
      t.integer :visit_id

      t.timestamps
    end
  end
end
