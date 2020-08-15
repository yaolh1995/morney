import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
/* const routeTable={
    '':""
} */

  const routes: Array<RouteConfig> = [
    {
      path: '',
      name: 'money',
      component:  () => import(/* webpackChunkName: "about" */ '../views/Money.vue')
    },
  {
    path: '/money',
    name: 'money',
    component:  () => import(/* webpackChunkName: "about" */ '../views/Money.vue')
  },
  {
    path: '/labels',
    name: 'labels',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Labels.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue')
  },
  {
    path: '*',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
