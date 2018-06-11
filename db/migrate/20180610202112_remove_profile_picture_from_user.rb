class RemoveProfilePictureFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :profile_picture, :string
  end
end
