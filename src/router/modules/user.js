export default {
  path: '/user',
  component: () => import('@/views/User/index.vue'),
  children: [
    {
      path: '/',
      name: 'UserList',
      component: () => import('@/views/User/pages/UserList.vue'),
    }
  ]
}
