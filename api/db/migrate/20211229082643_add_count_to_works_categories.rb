class AddCountToWorksCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :works_categories, :count, :integer
  end
end
