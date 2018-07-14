class Api::ChatroomsController < ApplicationController
  def create
    @chatroom = Chatroom.create
    @chatoomuser1 = ChatroomUser.create(
                          user_id: current_user.id,
                          chatroom_id: @chatroom.id
                          )
    @chatoomuser2 = ChatroomUser.create(
                          user_id: params[:receiver_id],
                          chatroom_id: @chatroom.id
                          )

    render "show.json.jbuilder"
    # Rails.logger.info(@vote.errors.inspect) 
  end

  def show
    @current_user_id = current_user.id
    @chatroom = Chatroom.find(params[:id])
    
    render 'show.json.jbuilder'
  end

  # def destroy #get rid of this
  #   chatroom_id = params[:id]
  #   chatroom = chatroom.find_by(id: chatroom_id)

  #   if chatroom.user_id == current_user.id
  #     chatroom.destroy
  #   else 
  #     render json: {message: "You are not authorized."}
  #   end 

  # end
end
