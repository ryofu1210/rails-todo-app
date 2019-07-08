import VueRouter from 'vue-router';
import AppPage from './app.vue';
import SamplePage from './components/sample.vue';

const routes = [
{
  path: '/', 
  component: SamplePage
}
]

export default new VueRouter({ routes });