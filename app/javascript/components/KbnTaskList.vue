<template>
  <div class="task-list">
    <KbnTaskListHeader :name="name" @add="shown = true" />
    <!-- {{id}}
    {{name}} -->
    <!-- {{ tasks[0].id }} -->
    <ul class="task-list-items">
      <draggable
        v-model="draggableTasks" :options="{ group: 'tasks' }"
        @change="handleChange" @end="handleEnd" >
        <li v-for="task in draggableTasks" :key="task.id">
          <KbnTaskCard v-bind="task" @remove="handleRemove" />
        </li>
      </draggable>
    </ul>
    <KbnTaskForm v-if="shown" :list_id="id" @close="shown = false" />
  </div>
</template>

<script>
import KbnTaskListHeader from './KbnTaskListHeader'
import KbnTaskCard from './KbnTaskCard'
import KbnTaskForm from './KbnTaskForm'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'


export default {
  name: 'KbnTaskList',

  components:{
    KbnTaskListHeader,
    KbnTaskCard,
    KbnTaskForm,
    draggable
  },

  props: {
    id: {
      type:　Number,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    tasks: {
      type: Array,
      default: () => []
    }
  },

  data (){
    return{
      shown: false
    }
  },

  computed: {
    draggableTasks: {
      get () { return this.tasks },
      set (value) {
        // NOTE:
        //  本来なら、Vue.Draggrableから処理されたデータをitemsに反映すれば可能だが、
        //  フロントエンドとバックエンドの状態を整合とるために、ここでは何もしない。
      }
    },
    ...mapState({
      canMove: state => {
        // console.log(state.dragging.target)
        return (state.dragging.target !== null &&
        state.dragging.from !== null &&
        state.dragging.to !== null)
      }
    })
  },

  methods: {
    handleRemove ({id, list_id}){
      return this.$store.dispatch('removeTask', {id, list_id})
              .catch(err => Promise.reject(err))
    },

    handleChange ({ added, removed }) {
      if (added) {
        return this.$store.dispatch('moveToTask', {
          id: added.element.id,
          list_id: this.id
        }).catch(err => Promise.reject(err))
      } else if (removed) {
        return this.$store.dispatch('moveTaskFrom', {
          id: removed.element.id,
          list_id: this.id
        }).catch(err => Promise.reject(err))
      }
    },

    handleEnd () {
      // console.log('handleEnd start')
      // console.log(this.$store.state.dragging)
      if (this.canMove) {
        return this.$store.dispatch('performTaskMoving')
          .catch(err => Promise.reject(err))
      }
    }

  }

  // computed: {
  //   tasks: () => {
  //     axios.get(`/api/lists/${this.id}.json`,)
  //   }
  // }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul li {
  margin: 8px;
  padding: 4px;
  border: thin solid black;
  border-radius: 0.5em;
}
</style>
