
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/reports', component: () => import('pages/ReportsPage.vue') },
      { path: '/dailyreports', component: () => import('pages/DailyReportsPage.vue') },
      { path: '/sellers', component: () => import('pages/SellerPage.vue') },
      { path: '/invoices', component: () => import('pages/InvoicesPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
