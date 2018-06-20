class Api::VotesController < ApplicationController
  def create
    @vote = Vote.find_or_create_by(
                            user_id: current_user.id,
                           votable_id: params[:votable_id],
                           votable_type: params[:votable_type]
                          )
     @vote.update(positive: params[:positive])

    # Rails.logger.info(@vote.errors.inspect) 
  end

  def destroy
    votable_id = params[:id]
    votable_type = params[:votable_type]
    vote = Vote.find_by(user_id: current_user.id, votable_id: votable_id, votable_type: votable_type)
    vote.destroy
    render json: {message: "Removed upvote."}
  end
end
