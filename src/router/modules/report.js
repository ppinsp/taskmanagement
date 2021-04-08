export default {
  path: '/report',
  component: () => import('@/views/Report/index.vue'),
  children: [
    {
      path: '',
      name: 'Report',
      component: () => import('@/views/Report/pages/report.vue')
    },
    
  ]
}