class Task < ApplicationRecord
  belongs_to :list

  validates :name, presence: true
  validates :status, presence: true

  enum status: {running: 0, done: 1}
end
