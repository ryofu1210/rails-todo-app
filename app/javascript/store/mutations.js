import * as types from './mutation-types';

export default {
  [types.FETCH_ALL_TASKLIST] (state, payload){
    state.lists = payload
  },

  [types.UPDATE_TASK] (state, payload){
    const in_task = payload
    for(let i=0; i<state.lists.length;i++){
      const list = state.lists[i]
      if(list.id !== in_task.list_id ){continue}
      for(let j=0; j< list.tasks.length; j++){
        const task = list.tasks[j]
        if( task.id === in_task.id){
          task.name = in_task.name
          task.desc = in_task.desc
          break
        }
      }
    }
  },

  [types.REMOVE_TASK] (state, payload){
    const { id, list_id } = payload
    for (let i = 0; i < state.lists.length; i++) {
      const list = state.lists[i]
      if (list.id !== list_id) { continue }
      list.tasks = list.tasks.filter(task => task.id !== id)
    }
  },

 
  [types.ADD_TASK] (state, payload) {
    // console.log('mutation start')
    const task = payload
    // console.log(task)
    for (let i = 0; i < state.lists.length; i++) {
      const list = state.lists[i]
      // console.log('mutation for文')
      if (list.id === task.list_id) {
        // console.log('task add!')
        list.tasks.push(task)
        break
      }
    }
  },

  [types.MOVE_TASK_FROM] (state, payload) {
    const { target, from } = payload
    state.dragging.target = target
    state.dragging.from = from
  },

  [types.MOVE_TO_TASK] (state, payload) {
    const { target, to } = payload
    state.dragging.target = target
    state.dragging.to = to
  },

  [types.MOVE_TASK_DONE] (state, payload) {
    const { target, from, to } = payload
    const getTaskList = (lists, id) => lists.find(list => list.id === id)

    // ドラッグ&ドロップ処理のための状態をリセット
    state.dragging.target = null
    state.dragging.from = null
    state.dragging.to = null

    // 移動元のタスクリストから対象タスクを取り出す
    const fromTaskList = getTaskList(state.lists, from)
    const index = fromTaskList.tasks.findIndex(task => task.id === target)
    const task = fromTaskList.tasks[index]
    fromTaskList.tasks.splice(index, 1)

    // 移動先のタスクリストIDに変更
    task.list_id = to

    // 移動先にタスクリストに対象タスクを格納
    const toTaskList = getTaskList(state.lists, to)
    toTaskList.tasks.push(task)
  }


}