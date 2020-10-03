import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import User from './modules/user'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      User
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
