module Api
    module V1
        class WorksCategoriesController < ApplicationController
            before_action :set_works_cateogry, only: [:show, :update, :destroy]

            def index
                works_categories = WorksCategory.order(created_at: :desc)
                works_categories.each do |works_cateogry|
                    works_cateogry.count = Work.where(works_category_id: works_cateogry.id).count
                end
                render json: { status: 'SUCCESS', message: 'Loaded works', data: works_categories }
            end

            def show
                render json: { status: 'SUCCESS', message: 'Loaded the work', data: @works_cateogry }
            end

            def create
                works_category = WorksCategory.new(works_category_params)
                if works_category.save
                render json: { status: 'SUCCESS', data: works_category }
                else
                render json: { status: 'ERROR', data: works_category.errors }
                end
            end

            def destroy
                @works_cateogry.destroy
                render json: { status: 'SUCCESS', message: 'Deleted the work', data: @works_cateogry }
            end

            def update
                if @works_cateogry.update(works_category_params)
                render json: { status: 'SUCCESS', message: 'Updated the work', data: @works_cateogry }
                else
                render json: { status: 'SUCCESS', message: 'Not updated', data: @works_cateogry.errors }
                end
            end

            private

            def set_works_cateogry
                @works_cateogry = WorksCategory.find(params[:id])
            end

            def works_category_params
                params.permit(
                    :name,
                    :slug,
                )
            end
        end
    end
end