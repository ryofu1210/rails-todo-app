export default {
  getTaskById: state => id => {
    let tasks = []
    state.lists.forEach(list => {
      tasks = tasks.concat(list.tasks)
    })
    // tasks = JSON.stringify(tasks)
    // console.log(`${tasks}`)
    return tasks.find((task) => task.id === id)
    // console.log(`結果：${task}`)
    // return task
  }
}