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
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          title: '首页',
        }
      },
      {
        path: '/core',
        name: 'Core',
        redirect: '/core/template',
        children: [
          {
            path: '/core/template',
            name: 'Template',
            component: () => import('@/pages/core/template/index.vue'),
            meta: {
              title: '模板管理',
            }
          },
          {
            path: '/core/product',
            name: 'Product',
            component: () => import('@/pages/core/product/index.vue'),
            meta: {
              title: '产品管理',
            }
          },
          {
            path: '/core/device',
            name: 'Device',
            component: () => import('@/pages/core/device/index.vue'),
            meta: {
              title: '设备管理',
            }
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
            component: () => import('@/pages/dictionary/industry/index.vue'),
            meta: {
              title: '行业类型',
            }
          },
          {
            path: '/dictionary/scene',
            name: 'Scene',
            component: () => import('@/pages/dictionary/scene/index.vue'),
            meta: {
              title: '应用场景',
            }
          },
          {
            path: '/dictionary/unit',
            name: 'Unit',
            component: () => import('@/pages/dictionary/unit/index.vue'),
            meta: {
              title: '数据单位',
            }
          },
        ]
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/pages/setting/index.vue'),
        meta: {
          title: '系统设置',
        }
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