import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

// * 导入所有router
const metaRouters = import.meta.globEager('./modules/*.ts')

// * 处理路由
export const routerArray: RouteRecordRaw[] = []
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key])
  })
})

const routes: RouteRecordRaw[] = [
  ...routerArray,
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: false,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
