import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import page from '@/views/404page.vue';

Vue.use(VueRouter)
/* const routeTable={
    '':""
} */

  const routes: Array<RouteConfig> = [
    {
      path: '/',
      redirect: '/Money'
    },
  {
    path: '/Money',
    name: 'Money',
    component: Money
  },
  {
    path: '/Labels',
    name: 'Labels',
    component:Labels
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component:Statistics
  },
  {
    path: '*',
    name: '404',
    component: page
  },
]

const router = new VueRouter({
  routes
})

export default router
