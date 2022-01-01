module Api
    module V1
        class BlogsController < ApplicationController
            before_action :set_blog, only: [:show, :update, :destroy]

            def index
                blogs = Blog.all
                render json: { status: 'SUCCESS', message: 'Loaded blogs', data: JSON.parse(blogs.to_json(include: [:tags])) }
            end

            def show
                render json: { status: 'SUCCESS', message: 'Loaded the blog', data: JSON.parse(@blog.to_json(include: [:tags])) }
            end

            def create
                blog = Blog.new(blog_params)
                if blog.save
                    set_blog_tags(blog)
                    render json: { status: 'SUCCESS', data: blog }
                else
                    render json: { status: 'ERROR', data: blog.errors }
                end
            end

            def update
                if @blog.update(blog_params)
                    set_blog_tags(@blog)
                    render json: { status: 'SUCCESS', message: 'Updated the blog', data: @blog }
                else
                    render json: { status: 'SUCCESS', message: 'Not updated', data: @blog.errors }
                end
            end

            def destroy
                @blog.destroy
                render json: { status: 'SUCCESS', message: 'Deleted the blog', data: @blog }
            end  

            private

            def set_blog
                @blog = Blog.find(params[:id])
            end

            def set_blog_tags(blog)
                blog.tags.destroy_all
                if params[:tag_ids]
                    tag_ids_string = params[:tag_ids].split(',')
                    tag_ids = tag_ids_string.map { |id| id.to_i }
                    if tag_ids.length > 0
                        tag_ids.each do |tag_id|
                            blog.tags << Tag.find(tag_id)
                        end
                    end
                end
            end

            def blog_params
                params.permit(
                    :title,
                    :slug,
                    :description,
                    :thumbnail,
                    :content,
                    :qiita,
                    :zenn,
                    :tag_ids,
                )
            end

        end
    end
end