json.list_id @list.id
json.tasks do
  json.array! @tasks, :id, :name, :desc, :status
end