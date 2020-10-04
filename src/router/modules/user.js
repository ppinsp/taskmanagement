export default {
  path: '/user',
  component: () => import('@/views/User/index.vue'),
  children: [
    {
      path: '/',
      name: 'UserList',
      component: () => import('@/views/User/pages/UserList.vue'),
    },
    {
      path: '/CreateAc',
      name: 'CreateAccount',
      component: () => import('@/views/User/pages/CreatAccount.vue'),
    },
    {
      path: '/UpdateAc',
      name: 'UpdateAccount',
      component: () => import('@/views/User/pages/UpdateAccount.vue'),
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: () => import('@/views/User/pages/UserDetail.vue'),
    },
  ]
}
