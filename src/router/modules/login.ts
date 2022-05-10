import type { RouteRecordRaw } from 'vue-router'

// 登录模块
const clientRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('~/pages/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
]

export default clientRouter
