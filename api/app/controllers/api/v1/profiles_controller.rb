module Api
    module V1
        class ProfilesController < ApplicationController        
            before_action :set_profile, only: [:show, :update, :destroy]

            def index
                profiles = Profile.all.order(created_at: :asc)
                render json: { status: 'SUCCESS', message: 'Loaded profiles', data: profiles }
            end

            def show
                render json: { status: 'SUCCESS', message: 'Loaded the work', data: @profile }
            end

            def create
                profile = Profile.new(profile_params)
                if profile.save
                render json: { status: 'SUCCESS', data: profile }
                else
                render json: { status: 'ERROR', data: profile.errors }
                end
            end

            def destroy
                @profile.destroy
                render json: { status: 'SUCCESS', message: 'Deleted the work', data: @profile }
            end

            def update
                if @profile.update(profile_params)
                render json: { status: 'SUCCESS', message: 'Updated the work', data: @profile }
                else
                render json: { status: 'SUCCESS', message: 'Not updated', data: @profile.errors }
                end
            end

            private

            def set_profile
                @profile = Profile.find(params[:id])
            end

            def profile_params
                params.permit(
                    :content
                )
            end
        end
    end
end