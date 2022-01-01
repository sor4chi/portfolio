class Contact < ApplicationRecord
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :name, presence: true, length: { maximum: 50 }
    validates :email, {presence: true, format: { with: VALID_EMAIL_REGEX }}
    validates :subject, presence: true, length: { maximum: 200 }
    validates :message, presence: true, length: { maximum: 3000 }
end
