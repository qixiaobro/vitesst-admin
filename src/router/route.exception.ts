/*
 * @Author: qixiaobro
 * @Date: 2022-05-06 09:58:44
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-08 19:38:43
 * @Description: 跟鉴权无关的路由
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

const exceptionRoutes: Array<RouteRecordRaw> = [
  {
    path: '/401',
    name: '401',
    meta: {
      title: '需要登录',
      hidden: true,
    },
    component: () => import('~/pages/exception/401.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '非常抱歉,页面走丢了',
      hidden: true,
    },
    component: () => import('~/pages/exception/404.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    meta: {},
    redirect: '/404',
  },
]

export default exceptionRoutes
