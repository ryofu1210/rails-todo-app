<template>
  <div class="board-view">
    <KbnBoardNavigation />
    <p v-if="progress" class="progress">{{message}}</p>
    <!-- <ul v-for="list in lists" :key="list.id">
      <li>{{list.name}}</li>
    </ul> -->
    <KbnBoardTask :lists="lists" />
    <router-view />
  </div>
</template>

<script>
// import HeaderComponent from './components/header';
import {mapState} from 'vuex'
import KbnBoardNavigation from './KbnBoardNavigation'
import KbnBoardTask from './KbnBoardTask'

export default {
  name: 'KbnBoardView',
  
  components: {
    KbnBoardNavigation,
    KbnBoardTask
  },

  data (){
    return {
      progress: false,
      message: ''
    }
  },

  computed: mapState({
    lists: state => state.lists
  }),

  created (){
    this.loadLists()
  },

  methods: {
    setProgress(message){
      this.progress = true
      this.message = message
    },

    resetProgress(){
      this.progress = false
      this.message = ''
    },

    loadLists() {
      this.setProgress('読み込み中...')

      this.$store.dispatch('fetchLists')
      .catch(err => Promise.reject(err))
      .then(() => {
        this.resetProgress()
      })
    },
  }

}
</script>

<style scoped>
.board-view {
  border: medium solid black;
}
.progress {
  margin: auto;
}
</style>
