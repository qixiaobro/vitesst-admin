import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

// 订单模块
const orderRouter: Array<RouteRecordRaw> = [
  {
    path: '/order',
    component: Layout,
    meta: {
      title: '订单管理',
    },
    children: [
      {
        path: 'orderList',
        component: () => import('~/pages/order/OrderList.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '订单列表',
        },
      },
    ],
  },
]

export default orderRouter
