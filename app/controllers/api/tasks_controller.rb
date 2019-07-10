class Api::TasksController < ApplicationController
  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.update_attributes(task_params)
      head :no_content
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy!
    head :no_content
  end

  def change
    
    @task = Task.find(params[:task_id])
    # logger.debug("")
    # logger.debug(params)
    if @task.update_attributes(task_params)
      head :no_content
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :desc, :status, :list_id)
  end

end
