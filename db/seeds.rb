TABLES = %w(
  lists tasks
)

ActiveRecord::Base.connection.execute("SET FOREIGN_KEY_CHECKS=0;");
TABLES.each do |table_name|
  ActiveRecord::Base.connection.execute("TRUNCATE TABLE #{table_name};")
end
ActiveRecord::Base.connection.execute("SET FOREIGN_KEY_CHECKS=1;");


ActiveRecord::Base.transaction do
	3.times do |i|
	  list = List.create(
        name: "list name #{i}",
    )
    # debugger
    3.times do |j|
      Task.create(
        name: "task name #{i}-#{j}",
        desc: "task desc",
        # status: :running,
        list_id: list.id
      )
    end
	end
end