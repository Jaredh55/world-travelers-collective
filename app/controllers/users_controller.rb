class UsersController < ApplicationController

  def index
    @users = User.all

    search_term = params[:search]

    if search_term
      capitalize_search_term = params[:search].downcase.titleize
      lowercase_search_term = params[:search].downcase
      temp_users = []
      if city = City.find_by(name: search_term)
        city.visits.each do |visit|
          temp_users << visit.user
        end
      end
      if city = City.find_by(name: capitalize_search_term)
        city.visits.each do |visit|
          temp_users << visit.user
        end
      end

      if country = Country.find_by(name: capitalize_search_term)
        country.cities.each do |city|
          city.visits.each do |visit|
            temp_users << visit.user
          end
        end
      end

      if email_bio_content = @users.where("email iLIKE ? OR bio iLIKE ?", "%#{search_term}%", "%#{search_term}%")
        temp_users = temp_users + email_bio_content
      end

      @users = temp_users
    end


    render 'index.json.jbuilder'
  end

  def create
    #username and email are the same!
    @user = User.new(
      email: params[:email],
      bio: params[:bio],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if @user.save
      render "show.json.jbuilder"
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @current_user_id = current_user.id
    
    user_id = params[:id]
    @user = User.find(user_id)
    render 'show.json.jbuilder'
  end

  def update
      user_id = params[:id]
      @user = User.find(user_id)

      @user.email = params[:email] || @user.email
      @user.bio = params[:bio] || @user.bio
      @user.user_image = params[:user_image] || @user.user_image
      
      if @user.save
      render 'show.json.jbuilder'
      else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
      end
  end
end
