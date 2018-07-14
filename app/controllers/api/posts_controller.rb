class Api::PostsController < ApplicationController
  def index
    @current_user_id = current_user.id
    @posts = Post.all

    search_term = params[:search]

    # location_search_term = params[:location]

    if search_term
      capitalize_search_term = params[:search].downcase.titleize
      lowercase_search_term = params[:search].downcase
      temp_posts = []
      if city = City.find_by(name: search_term)
        temp_posts = temp_posts + city.posts
      end
      if city = City.find_by(name: capitalize_search_term)
        temp_posts = temp_posts + city.posts
      end
      if country = Country.find_by(name: capitalize_search_term)
        temp_posts = temp_posts + country.posts.first
      end
      if tag = Tag.find_by(name: lowercase_search_term)
        temp_posts = temp_posts + tag.posts
      end

      if title_content = @posts.where("title iLIKE ? OR content iLIKE ?", "%#{search_term}%", "%#{search_term}%")
        temp_posts = temp_posts + title_content
      end

      @posts = temp_posts

    end

    # sort_attribute = params[:sort_by]
    # sort_order = params[:sort_order]

    # if sort_attribute == "score" && sort_order == "asc"
    #   @posts = @posts.sort_by_score_asc
    # elsif sort_attribute == "score" && sort_order == "desc"
    #   @posts = @posts.sort_by_score_desc
    # elsif sort_attribute == "created_at" && sort_order == "asc"
    #   @posts = @posts.order(sort_attribute => sort_order)
    # elsif sort_attribute == "created_at" && sort_order == "desc"
    #   @posts = @posts.order(sort_attribute => :desc)

    # elsif sort_attribute && sort_order
    #   @posts = @posts.order(sort_attribute => sort_order)
    # elsif sort_attribute
    #   @posts = @posts.order(sort_attribute => :asc)
    # else
    #   @posts = @posts.sort_by_score_desc
    # end

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
    @current_user_id = current_user.id
    
    post_id = params[:id]
    @post = Post.find(post_id)
    render 'show.json.jbuilder'
  end

  def create
    
    post_city = City.find_by(name: params[:city].downcase.titleize)
    post_city_id = post_city.id
    visit = Visit.find_by(user_id: current_user.id, city_id: post_city_id)

    if visit
      @post = Post.new(
                    # user_id: current_user.id,
                    title: params[:title],
                    content: params[:content],
                    latitude: params[:latitude],
                    longitude: params[:longitude],
                    post_image: params[:post_image],
                    visit_id: visit.id
                            )

        if @post.save
            if params[:tags]
            input_tags = params[:tags].downcase
            split_tags = input_tags.split(', ')
              split_tags.each do |tag|
                input_tag = Tag.find_or_create_by(name: tag)
                post_tag = PostTag.create(post_id: @post.id, tag_id: input_tag.id)
              end
            end

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

          post_tags = PostTag.where(post_id: @post.id)
          post_tags.each do |posttag|
            posttag.destroy
          end

          if params[:tags]
            input_tags = params[:tags]
            split_tags = input_tags.split(', ')
            split_tags.each do |tag|
              input_tag = Tag.find_or_create_by(name: tag)
              post_tag = PostTag.find_or_create_by(post_id: @post.id, tag_id: input_tag.id)
          end
        end

        render 'show.json.jbuilder'

        else
        render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
        end
  end

  def destroy
      post_id = params[:id]
      @post = Post.find(post_id)
      @post.destroy
      render json: {message: "Post successfully removed"}
  end
end
