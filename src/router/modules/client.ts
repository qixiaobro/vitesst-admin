import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

// 客户模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/client',
    component: Layout,
    meta: {
      title: '客户管理',
    },
    children: [
      {
        path: 'clientList',
        component: () => import('~/pages/client/ClientList.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '客户列表',
        },
      },
    ],
  },
]

export default homeRouter
