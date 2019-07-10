import VueRouter from 'vue-router';
import AppPage from './app.vue';
import KbnBoardView from './components/KbnBoardView.vue';
import KbnTaskDetailModal from './components/KbnTaskDetailModal.vue'

const routes = [
{
  path: '/', 
  component: KbnBoardView,
  children: [
    {
      path: 'tasks/:id',
      component: KbnTaskDetailModal,
      name: 'KbnTaskDetailModal'
    }
  ]
},
{
  path: '*',
  redirect: '/'
}
]

export default new VueRouter({ routes });