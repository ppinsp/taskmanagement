export default {
    path: '/development',
    component: () => import('@/views/Development/index.vue'),
    children: [
      {
        path: '/',
        name: 'Developer',
        component: () => import('@/views/Development/pages/Maindev.vue'),
      }
      
    ]
  }
  