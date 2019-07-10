json.array! @lists do |list|
  json.id list.id
  json.name list.name
  # json.list list
  json.tasks do
    json.array! list.tasks
  end
end