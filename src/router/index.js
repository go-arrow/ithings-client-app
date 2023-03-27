import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index.vue')
      },
      {
        path: '/core',
        name: 'Core',
        redirect: '/core/template',
        children: [
          {
            path: '/core/template',
            name: 'Template',
            component: () => import('@/pages/core/template/index.vue')
          },
          {
            path: '/core/product',
            name: 'Product',
            component: () => import('@/pages/core/product/index.vue')
          },
          {
            path: '/core/device',
            name: 'Device',
            component: () => import('@/pages/core/device/index.vue')
          },
        ]
      },
      {
        path: '/dictionary',
        name: 'Dictionary',
        redirect: '/dictionary/industry',
        children: [
          {
            path: '/dictionary/industry',
            name: 'Industry',
            component: () => import('@/pages/dictionary/industry/index.vue')
          },
          {
            path: '/dictionary/scene',
            name: 'Scene',
            component: () => import('@/pages/dictionary/scene/index.vue')
          },
          {
            path: '/dictionary/unit',
            name: 'Unit',
            component: () => import('@/pages/dictionary/unit/index.vue')
          },
        ]
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/pages/setting/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router