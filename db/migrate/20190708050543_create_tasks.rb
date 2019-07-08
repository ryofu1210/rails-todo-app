class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :desc
      t.integer :status, null: false, default: 0
      t.references :list

      t.timestamps
    end
  end
end
