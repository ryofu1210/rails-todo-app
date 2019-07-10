Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api, {format: 'json'} do
    resources :lists, only: %w(index show)
    resources :tasks, only: %w(update destroy create) do
      patch 'change'
    end
  end
end
