<template>
  <div class="task-detail-modal">
    <div class="wrapper">
      <div class="container">
        <div class="header">
          <KbnButton type="text" @click="handleClose">
            <KbnIcon name="close" />
          </KbnButton>
        </div>
        <div class="body">
          <KbnTaskDetailForm :task="task" :onupdate="handleUpdate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KbnButton from './KbnButton'
import KbnIcon from './KbnIcon'
import KbnTaskDetailForm from './KbnTaskDetailForm'

export default {
  name: 'KbnTaskDetailModal',

  components: {
    KbnButton,
    KbnIcon,
    KbnTaskDetailForm
  },

  computed: {
    task(){
      const id = parseInt(this.$route.params.id)
      // console.log("今task算出プロパティにいます")
      return !Number.isNaN(id) ? {...this.$store.getters.getTaskById(id) } : {}
    }
  },

  methods: {
    back (){
      this.$router.push('/')
    },

    handleClose() {
      this.back()
    },

    handleUpdate(task) {
      return this.$store.dispatch('updateTask',task)
              .then(()=>{
                this.back()
              })
              .catch(err => Promise.reject(err))
    },
  }


}
</script>

<style scoped>
.task-detail-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.wrapper {
  display: table-cell;
  vertical-align: middle;
}
.container {
  width: 480px;
  margin: 0 auto;
  padding: 8px;
  background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.header {
  text-align: right;
}
.header button {
  width: 16px;
  cursor: pointer;
}
.body {
  width: 100%;
}
</style>
