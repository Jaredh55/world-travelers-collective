class Api::PostsController < ApplicationController
  def index
    @posts = Post.all

    render 'index.json.jbuilder'
  end

  def show
    post_id = params[:id]
    @post = Post.find(post_id)
    render 'show.json.jbuilder'
  end

  def create
    @post = Post.new(
                    title: params[:title],
                    content: params[:content],
                    latitude: params[:latitude],
                    longitude: params[:longitude],
                    visit_id: params[:visit_id]
                            )

      if @post.save
        render 'show.json.jbuilder'
      elsif
        render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
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
