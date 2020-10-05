export default {
  path: '/department',
  component: () => import('@/views/Department/index.vue'),
  children: [
    {
      path: '/',
      name: 'Department',
      component: () => import('@/views/Department/pages/DepartmentList.vue'),
    },
    {
      path: 'create',
      name: 'CreatDepartment',
      component: () => import('@/views/Department/pages/CreateDepartment.vue'),
    },
    {
      path: ':id/update',
      name: 'UpdateDepartment',
      component: () => import('@/views/Department/pages/UpdateDepartment.vue'),
    },

  ]
}
