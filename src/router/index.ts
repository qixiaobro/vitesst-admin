/*
 * @Author: qixiaobro
 * @Date: 2022-05-06 09:40:50
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-07 22:47:14
 * @Description: 路由根文件
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import asyncRoutes from './route.async'
import commonRoutes from './route.common'
import exceptionRoutes from './route.exception'

const routes: Array<RouteRecordRaw> = [
  // 无鉴权的业务路由 ex:登录
  ...commonRoutes,
  // 带鉴权的业务路由
  ...asyncRoutes,
  // 异常页必须放在路由匹配规则的最后
  ...exceptionRoutes,
]

const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  // 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
