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
      path: 'createcompany',
      name: 'CreateCompany',
      component: () => import('@/views/Company/pages/createCompany.vue')
    },
    {
      path: 'companydetail',
      name: 'CompanyDetail',
      component: () => import('@/views/Company/pages/CompanyDetail.vue')
    },
    
  ]
}