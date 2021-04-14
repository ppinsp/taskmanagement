export default {
  path: '/company',
  component: () => import('@/views/Company/index.vue'),
  children: [
    {
      path: '/',
      name: 'Company List',
      component: () => import('@/views/Company/pages/CompanyList.vue')
    },
    {
      path: 'create',
      name: 'CreateCompany',
      component: () => import('@/views/Company/pages/createCompany.vue')
    },
    {
      path: 'detail',
      name: 'CompanyDetail',
      component: () => import('@/views/Company/pages/CompanyDetail.vue')
    },
    {
      path: ':id/update',
      name: 'UpdateCompany',
      component: () => import('@/views/Company/pages/createCompany.vue'),
    },
  ]
}