import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

// 客户模块
const clientRouter: Array<RouteRecordRaw> = [
  {
    path: '/client',
    component: Layout,
    redirect: '/client/clientList',
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
      {
        path: 'balanceLog',
        component: () => import('~/pages/client/BalanceLog.vue'),
        meta: {
          requiresAuth: true,
          title: '余额变动记录',
        },
      },
    ],
  },
]

export default clientRouter
