class Api::PostsController < ApplicationController
  def index
    @posts = Post.all

    search_term = params[:search]
    if search_term

      # @posts.where("title iLIKE ? OR content iLIKE ?", "%#{search_term}%", "%#{search_term}%")

      # # temp_posts<< @post.visit.city.where("name iLIKE ?", "%#{search_term}%")

      # # temp_posts<< @post.visit.city.country.where("name iLIKE ?", "%#{search_term}%")

      # @posts = temp_posts
      @posts = @posts.where("title iLIKE ? OR content iLIKE ?", "%#{search_term}%", "%#{search_term}%")
    end

    sort_attribute = params[:sort_by]
    sort_order = params[:sort_order]

    if sort_attribute && sort_order
      @posts = @posts.order(sort_attribute => sort_order)
    elsif sort_attribute
      @posts = @posts.order(sort_attribute => :asc)
    else
      @posts = @posts.order(:id => :asc)
    end

    # if sort_attribute == "votes"
    #   @posts = Post.left_joins(:votes).group(:id).order('COUNT(votes.id) DESC')
    # elsif sort_attribute = "votes" && sort_order
    #   @posts = Post.left_joins(:votes).group(:id).order('COUNT(votes.id) ASC')
    # else
    #   # @posts = @posts.order(:id => :asc)
    # end



    render 'index.json.jbuilder'
  end

  def show
    post_id = params[:id]
    @post = Post.find(post_id)
    render 'show.json.jbuilder'
  end

  def create
    post_city = City.find_by(name: params[:city])
    post_city_id = post_city.id
    visit = Visit.find_by(user_id: current_user.id, city_id: post_city_id)

    if visit
      @post = Post.new(
                    # user_id: current_user.id,
                    title: params[:title],
                    content: params[:content],
                    latitude: params[:latitude],
                    longitude: params[:longitude],
                    visit_id: visit.id
                            )

        if @post.save
          render 'show.json.jbuilder'
        elsif
          render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
        # render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
        end
    else
        render json: {message: "You have not visited this city."}, status: 403
    end
  end

  def update
      post_id = params[:id]
      @post = Post.find(post_id)

      @post.title = params[:title] || @post.title
      @post.content = params[:content] || @post.content
      @post.latitude = params[:latitude] || @post.latitude
      @post.longitude = params[:longitude] || @post.longitude
      @post.visit_id = params[:visit_id] || @post.visit_id
      
      if @post.save
      render 'show.json.jbuilder'
      else
      render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
      end
  end

  def destroy
      post_id = params[:id]
      @product = Product.find(post_id)
      @post.destroy
      render json: {message: "Post successfully removed"}
  end
end
