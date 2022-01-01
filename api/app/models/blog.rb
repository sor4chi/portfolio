class Blog < ApplicationRecord
    has_many :blog_tags, dependent: :destroy
    has_many :tags, through: :blog_tags
    mount_uploader :thumbnail, ImageUploader

    validates :title, presence: true, length: { maximum: 50 }
    validates :slug, presence: true, length: { maximum: 50 }, uniqueness: true
    validates :description, presence: true, length: { maximum: 100 }
    validates :thumbnail, presence: true
    validates :content, presence: true
end
