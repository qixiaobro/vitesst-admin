/*
 * @Author: qixiaobro
 * @Date: 2022-05-06 09:45:49
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-07 22:49:57
 * @Description: 需要鉴权的路由
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect:'/home',
    meta: {
      title: '首页',
    },
    component:Layout,
    children:[
      {
        path: '/home',
        meta: {
          title: '工作台',
        },
        component: () => import('~/pages/home/index.vue'),
      }
    ]
  },
]

export default asyncRoutes
