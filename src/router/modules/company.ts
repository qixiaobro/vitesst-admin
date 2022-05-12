import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

// 公司模块
const companyRouter: Array<RouteRecordRaw> = [
  {
    path: '/company',
    component: Layout,
    meta: {
      title: '公司管理',
    },
    children: [
      {
        path: 'companyList',
        component: () => import('~/pages/company/CompanyList.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '公司列表',
        },
      },
    ],
  },
]

export default companyRouter
