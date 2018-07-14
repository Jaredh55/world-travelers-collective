Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # post '/users' => 'users#create'


  namespace :api do
    get '/posts' => 'posts#index'
    get '/posts/:id' => 'posts#show'
    post '/posts' => 'posts#create'
    patch '/posts/:id' => 'posts#update'
    delete '/posts/:id' => 'posts#destroy'
  end

    get '/users' => 'users#index'
    get '/users/:id' => 'users#show'
    post '/users' => 'users#create'
    patch '/users/:id' => 'users#update'
    delete '/users/:id' => 'users#destroy'

  namespace :api do
    post '/votes' => 'votes#create'
    delete '/votes/:id' => 'votes#destroy'
  end

  namespace :api do
    post '/visits' => 'visits#create'
    delete '/visits/:id' => 'visits#destroy'
  end

  namespace :api do
    post '/comments' => 'comments#create'
    delete '/comments/:id' => 'comments#destroy'
  end

  namespace :api do
    post '/chats' => 'chats#create'
    # delete '/chats/:id' => 'chats#destroy'
  end

  namespace :api do
    get '/chatrooms/:id' => 'chatrooms#show'
    post '/chatrooms' => 'chatrooms#create'
    # delete '/chatrooms/:id' => 'chatrooms#destroy'
  end

end
