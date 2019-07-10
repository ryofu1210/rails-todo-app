import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  lists: [],

  dragging: { // ドラッグ&ドロップされるタスクを処理するための状態を格納する
    target: null, // ドラッグ&ドロップ対象のタスクID
    from: null, // ドラッグ元のタスクリストID
    to: null // ドロップ先のタスクリストID
  },

};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});