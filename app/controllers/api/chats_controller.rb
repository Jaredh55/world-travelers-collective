class Api::ChatsController < ApplicationController
  def create
    if ChatroomUser.find_by(chatroom_id: params[:chatroom_id], user_id: current_user.id)

      @chat = Chat.new(
                            user_id: current_user.id,
                            chatroom_id: params[:chatroom_id],
                            content: params[:content]
                            )

      if @chat.save
        @chatroom = @chat.chatroom
        render "api/chatrooms/show.json.jbuilder"
      end
    else
      render json: {message: "You are not authorized."}
    end
    # Rails.logger.info(@vote.errors.inspect) 
  end

  # def destroy
  #   chat_id = params[:id]
  #   chat = Chat.find_by(id: chat_id)

  #   if chat.user_id == current_user.id
  #     chat.destroy
  #   else 
  #     render json: {message: "You are not authorized."}
  #   end 

  # end
end
