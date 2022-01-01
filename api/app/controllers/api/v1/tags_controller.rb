module Api
    module V1
        class TagsController < ApplicationController
            before_action :set_tag, only: [:show, :update, :destroy]

            def index
                tags = Tag.all
                render json: { status: 'SUCCESS', message: 'Loaded tags', data: tags }
            end

            def show
                render json: { status: 'SUCCESS', message: 'Loaded tags', data: @tag }
            end

            def create
                @tag = Tag.new(tag_params)
                if @tag.save
                    render json: { status: 'SUCCESS', data: @tag }
                else
                    render json: { status: 'ERROR', data: @tag.errors }
                end
            end

            def destroy
                @tag.destroy
                render json: { status: 'SUCCESS', message: 'Deleted the tag', data: @tag }
            end

            def update
                if @tag.update(tag_params)
                    render json: { status: 'SUCCESS', message: 'Updated the tag', data: @tag }
                else
                    render json: { status: 'SUCCESS', message: 'Not updated', data: @tag.errors }
                end
            end

            private

            def set_tag
                @tag = Tag.find(params[:id])
            end

            def tag_params
                params.permit(
                    :name,
                    :slug
                )
            end
        end
    end
end