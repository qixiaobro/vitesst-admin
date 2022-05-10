import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('~/pages/home/Home.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '首页',
          key: 'home',
        },
      },
    ],
  },
]

export default homeRouter
