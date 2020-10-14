export default {
  path: 'user',
  component: () => import('@/views/User/index.vue'),
  children: [
    {
      path: '',
      name: 'UserList',
      component: () => import('@/views/User/pages/UserList.vue'),
    },
    {
      path: 'create',
      name: 'CreateAccount',
      component: () => import('@/views/User/pages/CreatAccount.vue'),
    },
    {
      path: ':id/update',
      name: 'UpdateAccount',
      component: () => import('@/views/User/pages/UpdateAccount.vue'),
    },
    {
      path: ':id/detail',
      name: 'userDetail',
      component: () => import('@/views/User/pages/UserDetail.vue'),
    },
  ]
}
