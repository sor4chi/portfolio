class Work < ApplicationRecord
    belongs_to :works_category
    mount_uploader :thumbnail, ImageUploader

    validates :title, presence: true, length: { maximum: 50 }
    validates :slug, presence: true, length: { maximum: 50 }, uniqueness: true, format: { with: /\A[a-z0-9\-]+\z/ }
    validates :description, presence: true, length: { maximum: 100 }
    validates :thumbnail, presence: true
    validates :works_category_id, presence: true
    validates :content, presence: true
end
