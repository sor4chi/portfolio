class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
      t.string :title
      t.string :slug
      t.string :description
      t.string :thumbnail
      t.text :content
      t.string :qiita
      t.string :zenn

      t.timestamps
    end
  end
end
