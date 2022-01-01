Rails.application.routes.draw do
    namespace :api do
        namespace :v1 do
            resources :profiles
            resources :works
            resources :works_categories
            resources :blogs
            resources :tags
            resources :contacts
        end
    end
end
