class UsersController < ApplicationController

  def index
    @users = User.all

    render 'index.json.jbuilder'
  end

  def create
    @user = User.new(
      username: params[:username],
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
    user_id = params[:id]
    @user = User.find(user_id)
    render 'show.json.jbuilder'
  end

  def update
      user_id = params[:id]
      @user = User.find(user_id)

      @user.username = params[:username] || @user.username
      @user.bio = params[:bio] || @user.bio
      
      if @user.save
      render 'show.json.jbuilder'
      else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
      end
  end
end
