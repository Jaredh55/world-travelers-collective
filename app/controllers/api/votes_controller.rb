class Api::VotesController < ApplicationController
  def create
    @vote = Vote.find_or_create_by(
                            user_id: current_user.id,
                           votable_id: params[:votable_id],
                           votable_type: params[:votable_type]
                          )
      if @vote.update(positive: params[:positive])
        if params[:votable_type] == "Post"
          @post = @vote.post
          render "api/posts/show.json.jbuilder"
        elsif params[:votable_type] == "Comment"
          @post = @vote.comment.post
          render "api/posts/show.json.jbuilder"
        end
      end
      

    # Rails.logger.info(@vote.errors.inspect) 
  end

  def destroy
    votable_id = params[:id]
    votable_type = params[:votable_type]
    vote = Vote.find_by(user_id: current_user.id, votable_id: votable_id, votable_type: votable_type)

    @post = vote.post
    if vote.destroy
      render "api/posts/show.json.jbuilder"
    end

    # render json: {message: "Removed upvote."}
  end
end
