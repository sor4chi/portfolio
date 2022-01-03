module Api
    module V1
        class WorksController < ApplicationController        
            before_action :set_work, only: [:show, :update, :destroy]

            def index
                works = Work.all.order(created_at: :desc)
                render json: { status: 'SUCCESS', message: 'Loaded works', data: works }
            end

            def show
                render json: { status: 'SUCCESS', message: 'Loaded the work', data: @work }
            end

            def create
                work = Work.new(work_params)
                if work.save
                render json: { status: 'SUCCESS', data: work }
                else
                render json: { status: 'ERROR', data: work.errors }
                end
            end

            def update
                if @work.update(work_params)
                render json: { status: 'SUCCESS', message: 'Updated the work', data: @work }
                else
                render json: { status: 'SUCCESS', message: 'Not updated', data: @work.errors }
                end
            end

            def destroy
                @work.destroy
                render json: { status: 'SUCCESS', message: 'Deleted the work', data: @work }
            end

            private

            def set_work
                @work = Work.find(params[:id])
            end

            def work_params
                params.permit(
                    :title,
                    :slug,
                    :description,
                    :thumbnail,
                    :works_category_id,
                    :content,
                )
            end
        end
    end
end