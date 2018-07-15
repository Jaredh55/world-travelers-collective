class Api::VisitsController < ApplicationController
  def create
    country_name = params[:country].downcase.titleize
    visited_country = Country.find_or_create_by(name: country_name)
    visited_country_id = visited_country.id

    city_name = params[:city].downcase.titleize
    visited_city = City.find_or_create_by(name: city_name, country_id: visited_country_id)

    visited_city_id = visited_city.id


    @visit = Visit.new(
                          user_id: current_user.id,
                          city_id: visited_city_id,
                          start_date: params[:start_date],
                          end_date: params[:end_date]
                          )

    @visit.save
    # Rails.logger.info(@vote.errors.inspect) 
  end

  def destroy
    visit_id = params[:id]

    visit = Visit.find_by(id: visit_id)

    if visit.user_id == current_user.id
      visit.destroy
    else 
      render json: {message: "You are not authorized."}
    end 

  end

end
