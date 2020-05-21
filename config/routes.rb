Rails.application.routes.draw do
  get 'boogles/index'

  namespace :api, defaults: {format: 'json'} do
    get 'start', to: 'boards#start'
  end

  root 'boogles#index'


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
