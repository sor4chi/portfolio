class ApplicationController < ActionController::API
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate
    #  if: :production?

    protected
    def production?
        Rails.env.production?
    end

    def authenticate
        authenticate_or_request_with_http_token do |token, options|
        token == ENV['NEXT_PUBLIC_API_TOKEN']
        end
    end
end 
