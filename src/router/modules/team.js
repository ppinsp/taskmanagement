export default {
  path: '/team',
  component: () => import('@/views/Team/index.vue'),
  children: [
    {
      path: '/',
      name: 'TeamList',
      component: () => import('@/views/Team/pages/TeamList.vue'),
    },
    {
      path: '/createTeam',
      name: 'CreateTeam',
      component: () => import('@/views/Team/pages/CreateTeam.vue'),
    },
    {
      path: '/updateTeam',
      name: 'UpdateTeam',
      component: () => import('@/views/Team/pages/UpdateTeam.vue'),
    },
    {
      path: '/teamDetail',
      name: 'TeamDetail',
      component: () => import('@/views/Team/pages/TeamDetail.vue'),
    },

  ]
}
