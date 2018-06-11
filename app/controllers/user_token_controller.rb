class UserTokenController < Knock::AuthTokenController
  def create
    username = request.params["auth"] && request.params["auth"]["username"]
    user = User.find_by(username: username)
    body = {
      jwt: auth_token.token,
      user: { id: user.id, username: user.username }
    }

    # bio: user.bio
    render json: body, status: :created
  end
end
