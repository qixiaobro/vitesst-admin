import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from '~/config/nprogress'

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

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = to.meta.title as unknown as string

  // determine whether the user has logged in
  const hasToken = sessionStorage.getItem('token')
  if (hasToken) { // 有token
    if (to.path === '/login') {
      // 如果是进入登录页面 则重定向到首页
      next({ path: '/' })
      NProgress.done() // 页面导航结束
    }
    else {
      next()
    }
  }
  else {
    // 没有token
    if (whiteList.includes(to.path)) {
      // 白名单页直接进入
      next()
    }
    else {
      // 其它页面没有权限重定向到登录页
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router

