class CreateWorks < ActiveRecord::Migration[6.1]
  def change
    create_table :works do |t|
      t.string :title
      t.string :slug
      t.string :description
      t.string :thumbnail
      t.integer :works_category_id
      t.text :content

      t.timestamps
    end
  end
end
