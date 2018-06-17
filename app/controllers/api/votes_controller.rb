class Api::VotesController < ApplicationController
  def create
    @vote = Vote.new(
                            user_id: current_user.id,
                           votable_id: params[:votable_id],
                           votable_type: "Post",
                           positive: true
                          )

    @vote.save
    Rails.logger.info(@vote.errors.inspect) 
  end

  def destroy
    post_id = params[:id]
    vote = Vote.find_by(user_id: current_user.id, votable_id: post_id, votable_type: "Post")
    vote.destroy
    render json: {message: "Removed upvote."}
  end
end
