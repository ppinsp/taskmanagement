export default {
  path: '/review',
  component: () => import('@/views/Reviews/index.vue'),
  children: [
    {
      path: '',
      name: 'review',
      component: () => import('@/views/Reviews/pages/createReview.vue'),
    },
  ]
}
