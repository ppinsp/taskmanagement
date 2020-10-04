export default {
  path: '/project',
  component: () => import('@/views/Project/index.vue'),
  children: [
    {
      path: '/',
      name: 'ProjectList',
      component: () => import('@/views/Project/pages/ProjectList.vue'),
    },
    {
      path: '/createProject',
      name: 'CreateProject',
      component: () => import('@/views/Project/pages/CreateProject.vue'),
    },
    {
      path: '/projectDetail',
      name: 'ProjectDetail',
      component: () => import('@/views/Project/pages/ProjectDetail.vue'),
    },
    {
      path: '/updateProject',
      name: 'UpdateProject',
      component: () => import('@/views/Project/pages/UpdateProject.vue'),
    },

  ]
}
