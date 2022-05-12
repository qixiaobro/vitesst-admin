import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

// 申报模块
const declareRouter: Array<RouteRecordRaw> = [
  {
    path: '/declare',
    component: Layout,
    redirect: '/declare/declareList',
    meta: {
      title: '申报管理',
    },
    children: [
      {
        path: 'declareList',
        component: () => import('~/pages/declare/DeclareList.vue'),
        meta: {
          keepAlive: true,
          title: '待申报列表',
        },
      },
      {
        path: 'declareLog',
        component: () => import('~/pages/declare/DeclareLog.vue'),
        meta: {
          keepAlive: true,
          title: '申报记录',
        },
      },
      {
        path: 'newDeclare/:status',
        component: () => import('~/pages/declare/DeclareChange.vue'),
        meta: {
          keepAlive: true,
          title: '新增申报列表',
        },
      },
      {
        path: 'stopDeclare/:status',
        component: () => import('~/pages/declare/DeclareChange.vue'),
        meta: {
          keepAlive: true,
          title: '停止申报列表',
        },
      },
    ],
  },
]

export default declareRouter
