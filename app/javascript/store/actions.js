import client from './client';
import * as types from './mutation-types';

const actions = {
  fetchLists: ({commit}) => {
    return client.get('/api/lists.json')
    .then((res) => {
      commit(types.FETCH_ALL_TASKLIST, res.data)
    })
    .catch(err => { throw err})
  },

  // fetchTasks: ({commit}, {listId}) => {
  //   return client.get(`/api/lists/${listId}.json`)
  //   .then((res)) 
  // }
  addTask: ({ commit}, { name, desc, list_id }) => {
    // console.log("action start")
    return client.post(`/api/tasks.json`, {name, desc, list_id})
      .then((res) => {
        commit(types.ADD_TASK, res.data)
      })
      .catch(err => { throw err })
  },

  updateTask: ({commit}, task) => {
    return client.patch(`/api/tasks/${task.id}.json`, task)
    .then(()=>{
      commit(types.UPDATE_TASK, task)
    })
    .catch(err => {throw err})
  },

  removeTask: ({commit}, {id, list_id}) => {
    return client.delete(`/api/tasks/${id}.json`)
    .then(()=>{
      // console.log("action then")
      commit(types.REMOVE_TASK, {id,list_id})
    })
    .catch(err => {
      // console.log("action catch")
      throw err
    })
  },

  moveTaskFrom: ({ commit, state }, { id, list_id }) => {
    commit(types.MOVE_TASK_FROM, { target: id, from: list_id })
    return Promise.resolve()
  },

  moveToTask: ({ commit, state }, { id, list_id }) => {
    // console.log('moveToTask action start')
    commit(types.MOVE_TO_TASK, { target: id, to: list_id })
    return Promise.resolve()
  },

  performTaskMoving: ({ commit, state }) => {
    // console.log('performTaskMoving action start')
    const { target, from, to } = state.dragging
    // return Task.move(state.auth.token, { id: target, from, to })
    return client.patch(`/api/tasks/${target}/change.json`,{task: {list_id: to}})
      .then(() => {
        commit(types.MOVE_TASK_DONE, { target, from, to })
      })
      .catch(err => { throw err })
  },
};

export default actions; 