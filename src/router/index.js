import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import User from './modules/user'
import CreatAccount from './modules/user'
import UpdateAccount from './modules/user'
import UserDetail from './modules/user'
import Team from './modules/team'
import CreateTeam from './modules/team'
import UpdateTeam from './modules/team'
import TeamDetail from './modules/team'
import Project from './modules/project'
import CreateProject from './modules/project'
import ProjectDetail from './modules/project'
import UpdateProject from './modules/project'
import Department from './modules/department'
import CreatDepartment from './modules/department'
import UpdateDepartment from './modules/department'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      User,
      CreatAccount,
      UpdateAccount,
      UserDetail,
      Team,
      CreateTeam,
      UpdateTeam,
      TeamDetail,
      Project,
      CreateProject,
      ProjectDetail,
      UpdateProject,
      Department,
      CreatDepartment,
      UpdateDepartment
      
    ]

  },
  {
    path: '/singIn',
    name: 'SingIn',
    component: () => import('@/views/SingIn/pages/SingIn.vue'),
  },
  {
  path: '/forgotPassword',
  name: 'ForgotPassword',
  component: () => import('@/views/SingIn/pages/ForgotPassword.vue'),
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: () => import('@/views/SingIn/pages/ResetPassword.vue'),
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
