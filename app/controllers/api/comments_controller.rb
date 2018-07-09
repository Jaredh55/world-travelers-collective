class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(
                          user_id: current_user.id,
                          post_id: params[:post_id],
                          content: params[:content]
                          )

    if @comment.save
      @post = @comment.post
      render "api/posts/show.json.jbuilder"
    end
    # Rails.logger.info(@vote.errors.inspect) 
  end

  def destroy
    comment_id = params[:id]
    comment = Comment.find_by(id: comment_id)

    if comment.user_id == current_user.id
      comment.destroy
    else 
      render json: {message: "You are not authorized."}
    end 

  end
end
