/*
 * @Author: qixiaobro
 * @Date: 2022-05-06 09:45:49
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-08 20:00:33
 * @Description: 需要鉴权的路由
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'home-filled',
    },
    component: Layout,
    children: [
      {
        meta: {
          title: '首页',
          icon: 'home-filled',
        },
        path: '/home',
        component: () => import('~/pages/home/index.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    redirect: '/testindex',
    component: Layout,
    meta: {
      title: '测试1',
      icon: 'home-filled',
    },
    children: [
      {
        meta: {
          title: '测试1',
          icon: 'home-filled',
        },
        path: '/testindex',
        component: () => import('~/pages/home/index.vue'),
      },
    ],
  },
  {
    path: '/test2',
    name: 'test2',
    redirect: '/testindex2',
    component: Layout,
    meta: {
      title: '管理',
      icon: 'home-filled',
    },
    children: [
      {
        meta: {
          title: '测试2',
        },
        path: '/testindex2',
        component: () => import('~/pages/home/index.vue'),
      },
      {
        meta: {
          title: '测试3',
        },
        path: '/testindex3',
        component: () => import('~/pages/home/index.vue'),
      },
    ],
  },
  // {
  //   path:'/test2',
  //   name:'test',
  //   meta: {
  //     title: '测试2',
  //     icon: "home-filled",
  //   },
  //   component: () => import('~/pages/home/index.vue'),
  // }
]

export default asyncRoutes
