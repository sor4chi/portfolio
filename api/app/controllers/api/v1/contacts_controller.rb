module Api
    module V1
        class ContactsController < ApplicationController
            before_action :set_contact, only: [:show, :update, :destroy]

            def index
                contacts = Contact.all
                render json: { status: 'SUCCESS', message: 'Loaded contacts', data: contacts }
            end

            def show
                render json: { status: 'SUCCESS', message: 'Loaded the contact', data: @contact }
            end

            def create
                contact = Contact.new(contact_params)
                if contact.save
                    render json: { status: 'SUCCESS', data: contact }
                else
                    render json: { status: 'ERROR', data: contact.errors }
                end
            end

            def destroy
                @contact.destroy
                render json: { status: 'SUCCESS', message: 'Deleted the contact', data: @contact }
            end

            def update
                if @contact.update(contact_params)
                    render json: { status: 'SUCCESS', message: 'Updated the contact', data: @contact }
                else
                    render json: { status: 'SUCCESS', message: 'Not updated', data: @contact.errors }
                end
            end

            private

            def set_contact
                @contact = Contact.find(params[:id])
            end

            def contact_params
                params.permit(
                    :name,
                    :email,
                    :subject,
                    :message
                )
            end
        end
    end
end