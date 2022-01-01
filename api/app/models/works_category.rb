class WorksCategory < ApplicationRecord
    has_many :works
    validates :name, presence: true, length: { maximum: 50 }
    validates :slug, presence: true, length: { maximum: 50 }, uniqueness: true
end
