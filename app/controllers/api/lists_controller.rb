class Api::ListsController < ApplicationController
  def index
    @lists = List.all
    # render json: @lists
  end

  def show
    @list = List.find(params[:id])
    @tasks = Task.where(list_id: @list.id)
  end

end
