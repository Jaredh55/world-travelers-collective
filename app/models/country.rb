class Country < ApplicationRecord
  has_many :cities

  def posts
    city_posts = []
    cities.each do |city|
      city_posts << city.posts
    end
    city_posts
  end
end
