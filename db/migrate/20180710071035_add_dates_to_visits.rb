class AddDatesToVisits < ActiveRecord::Migration[5.1]
  def change
    add_column :visits, :start_date, :date
    add_column :visits, :end_date, :date
  end
end
