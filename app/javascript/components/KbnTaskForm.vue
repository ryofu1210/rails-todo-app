<template>
  <form class="task-form" novalidate>
    <div class="form-item">
      <input type="text" v-model="name" placeholder="タスク..." >
    </div>
    <div class="form-item">
      <input type="text" v-model="desc" placeholder="説明..." >
    </div>
    <div class="form-actions">
      <KbnButton :disabled="disableAddAction" @click="handleAdd" >
        追加
      </KbnButton>
      <KbnButton :disabled="progress" @click="handleCancel" >
        キャンセル
      </KbnButton>
    </div>
    <div class="messages">
      <p v-if="progress" class="add-progress">
        追加中...
      </p>
      <p v-if="error" class="add-error" >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script>
import KbnButton from './KbnButton'

export default {
  name: 'KbnTaskForm',

  components: {
    KbnButton
  },
  
  props: {
    list_id: {
      type:Number,
      required: true
    }
  },

  data(){
    return {
      name: '',
      desc: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    disableAddAction (){
      return this.name.length === 0 || this.progress
    }
  },

  methods: {
    handleAdd (){
      this.progress = true
      this.error = ''

      const {list_id, name, desc} = this
      return this.$store.dispatch('addTask', { name, desc, list_id})
        .then(() => {
          this.$emit('close')
        })
        .catch(err => {
          this.error = err.message
        })
        .then(() => {
          this.progress = false
        })

    },

    handleCancel () {
      this.$emit('close')
    }
  }



}
</script>

<style scoped>
.task-form {
  margin: 8px;
  padding: 4px;
  border: thin solid black;
  border-radius: 0.5em;
}
.form-item {
  padding: 4px;
}
input {
  width: 100%;
  padding: 0;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
</style>
