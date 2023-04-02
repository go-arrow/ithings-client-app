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
        name: 'dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          breadcrumb: '首页',
          menu: 'dashboard',
        }
      },
      {
        path: '/core',
        name: 'Core',
        redirect: '/core/template',
        children: [
          {
            path: '/core/template',
            children: [
              {
                path: '', // 默认子路由
                name: 'template',
                component: () => import('@/pages/core/template/index.vue'),
                meta: {
                  breadcrumb: '模板管理',
                  menu: 'template',
                },
              },
              {
                path: '/core/template/create',
                name: 'templateCreate',
                component: () => import('@/pages/core/template/create/index.vue'),
                meta: {
                  breadcrumb: '创建模板',
                  menu: 'template',
                },
              }
            ]
          },
          {
            path: '/core/product',
            children: [
              {
                path: '', // 默认子路由
                name: 'product',
                component: () => import('@/pages/core/product/index.vue'),
                meta: {
                  breadcrumb: '产品管理',
                  menu: 'product',
                },
              },
              {
                path: '/core/product/create',
                name: 'productDetail',
                component: () => import('@/pages/core/product/detail/index.vue'),
                meta: {
                  breadcrumb: '产品详情',
                  menu: 'product',
                },
              }
            ],
          },
          {
            path: '/core/device',
            name: 'device',
            component: () => import('@/pages/core/device/index.vue'),
            meta: {
              breadcrumb: '设备管理',
              menu: 'device',
            },
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
            name: 'industry',
            component: () => import('@/pages/dictionary/industry/index.vue'),
            meta: {
              breadcrumb: '行业类型',
              menu: 'industry',
            },
          },
          {
            path: '/dictionary/scene',
            name: 'scene',
            component: () => import('@/pages/dictionary/scene/index.vue'),
            meta: {
              breadcrumb: '应用场景',
              menu: 'scene',
            },
          },
          {
            path: '/dictionary/unit',
            name: 'unit',
            component: () => import('@/pages/dictionary/unit/index.vue'),
            meta: {
              breadcrumb: '数据单位',
              menu: 'unit',
            },
          },
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/pages/setting/index.vue'),
        meta: {
          breadcrumb: '系统设置',
          menu: 'setting',
        },
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