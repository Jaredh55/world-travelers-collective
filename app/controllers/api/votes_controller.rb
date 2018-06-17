class Api::VotesController < ApplicationController
  def create
    @vote = Vote.find_or_create_by(
                            user_id: current_user.id,
                           votable_id: params[:votable_id],
                           votable_type: "Post",
                          )
     @vote.update(positive: params[:positive])

    # Rails.logger.info(@vote.errors.inspect) 
  end

  def destroy
    post_id = params[:id]
    vote = Vote.find_by(user_id: current_user.id, votable_id: post_id, votable_type: "Post")
    vote.destroy
    render json: {message: "Removed upvote."}
  end
end
