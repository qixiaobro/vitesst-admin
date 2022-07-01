import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from '~/config/nprogress'
import Layout from '~/layout/index.vue'
// * 导入所有router
// const metaRouters = import.meta.globEager('./modules/*.ts')

// // * 处理路由
// export const routerArray: RouteRecordRaw[] = []
// Object.keys(metaRouters).forEach((item) => {
//   Object.keys(metaRouters[item]).forEach((key: any) => {
//     routerArray.push(...metaRouters[item][key])
//   })
// })
const routes: RouteRecordRaw[] = [
  // ...routerArray,
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
          icon: 'carbon:box-small',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('~/pages/login/index.vue'),
    meta: {
      title: '登录',
      hide: true,
    },
  },
  { // 一级菜单，没有子菜单
    path: '/client',
    component: Layout,
    children: [
      {
        path: 'clientList',
        component: () => import('~/pages/client/ClientList.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '客户列表',
          permissions: ['admin'],
          icon: 'carbon:box-small',
        },
      },
      {
        path: 'balanceLog',
        component: () => import('~/pages/client/BalanceLog.vue'),
        meta: {
          requiresAuth: true,
          title: '余额变动记录',
          hide: true,
          icon: 'carbon:box-small',
        },
      },
    ],
  },
  { // 二级菜单，有子菜单
    path: '/order',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'carbon:box-small',
    },
    children: [
      {
        path: 'clientList',
        component: () => import('~/pages/client/ClientList.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '订单列表',
          permissions: ['admin'],
          icon: 'carbon:box-small',
        },
      },
      {
        path: 'balanceLog',
        component: () => import('~/pages/client/BalanceLog.vue'),
        meta: {
          requiresAuth: true,
          title: '订单变动记录',
          hide: true,
          icon: 'zondicons:bookmark-outline-add',
        },
      },
    ],
  },
  { // 三级菜单
    path: '/nest',
    component: Layout,
    meta: {
      title: '嵌套路由',
      icon: 'zondicons:bookmark-outline-add',
    },
    children: [
      {
        path: 'meun1',
        component: () => import('~/pages/nest/menu1/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: 'meun1',
          permissions: ['admin'],
          icon: 'zondicons:bookmark-outline-add',
        },
        children: [
          {
            path: 'meun11',
            component: () => import('~/pages/nest/menu1/menu11/index.vue'),
            meta: {
              keepAlive: true,
              requiresAuth: true,
              title: 'meun11',
              permissions: ['admin'],
              icon: 'zondicons:bookmark-outline-add',
            },
          }, {
            path: 'meun12',
            component: () => import('~/pages/nest/menu1/menu12/index.vue'),
            meta: {
              keepAlive: true,
              requiresAuth: true,
              title: 'meun12',
              permissions: ['admin'],
              icon: 'zondicons:bookmark-outline-add',
            },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('~/pages/nest/menu2/index.vue'),
        meta: {
          requiresAuth: true,
          title: 'menu2',
          icon: 'zondicons:bookmark-outline-add',
        },
      },
    ],
  },
  {
    path: '/401',
    name: '401',
    meta: {
      title: '需要登录',
      hide: true,
    },
    component: () => import('~/pages/exception/401.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '非常抱歉,页面走丢了',
      hide: true,
    },
    component: () => import('~/pages/exception/404.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    meta: {
      title: '非常抱歉,页面走丢了',
      hide: true,
    },
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

// 判断是否有权限
const hasPermission = (permissions: string[], role: string[]): boolean => {
  if (permissions.length === 0)
    return true

  return permissions.some(item => role.includes(item))
}

// TODO: 生成侧边菜单
// 1. 判断路由是否有hide属性，有就不生成
// 2. 判断role是否包含permissions的值
// 3. 如果有children，判断是否只有一个子路由，如果是，则生成一个路由，否则递归生成
// 4. 如果没有children，则生成一个路由
const generateMenu = (routers: RouteRecordRaw[]) => {
  const menu: any[] = []
  const role = sessionStorage.getItem('role') ? JSON.parse(sessionStorage.getItem('role')!) : []
  for (const router of routers) {
    if (router.meta && router.meta.hide) { // 不显示在菜单中，跳过
      continue
    }
    else if (router.meta && router.meta.permissions && !hasPermission(router.meta.permissions, role)) { // 没有权限
      continue
    }
    else {
      if (!router.children) { // 没有子路由
        menu.push({
          path: router.path,
          name: router.name || '',
          meta: router.meta,
        })
      }
      else if (!router.meta) { // 没有meta，即非二级以上菜单，生成第一个child路由，其它的不生成
        if (router.children[0].meta?.hide) { // 如果子路由有hide属性，则不生成
          continue
        }
        menu.push({
          meta: router.children[0].meta,
          name: router.children[0].name || '',
          path: router.children[0].path ? `${router.path}/${router.children[0].path}` : router.path,
        })
      }
      else { // 多个子路由，是个二级以上菜单
        const children = generateMenu(router.children)
        if (children.length === 0)
          continue
        menu.push({
          path: router.path,
          name: router.name || '',
          meta: router.meta,
          children,
        })
      }
    }
  }
  return menu
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = to.meta.title

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
  else { // 没有token
    if (!to.meta.requiresAuth) { // 不需要登录
      next()
    }
    else { // 其它页面没有权限重定向到登录页
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export { router, routes, generateMenu }

