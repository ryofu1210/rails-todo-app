<template>
  <div>
    <p>{{ message }}</p>
    <!-- <ul v-for="list in lists" :key="list.id">
      <li>{{ list.name }}</li>
    </ul> -->
  </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "sample Vue!",
      task_lists: [],
    }
  },

  // computed: mapState({
  //   lists: state => state.lists
  // }),

  // mounted (){
  //   axios.get('/api/lists.json').then(res => {this.task_lists = res.data})
  // },

  // created (){
  //   this.loadLists()
  // },

  // methods: {
  //   loadLists () {
  //     this.$store.dispatch('fetchLists')
  //     .then(res => {})
  //   }
  // }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
