import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
  /** 路由标题(可用来作document.title或者菜单的名称) */
    title: string
    /** 需要登录权限 */
    requiresAuth?: boolean
    /**
   * 哪些类型的用户有权限才能访问的路由(空的话则表示不需要权限)
   * @description 后端动态路由数据不需要该属性，直接由后端根据用户角色返回对应权限的路由数据
   */
    permissions?: string[]
    /** 缓存页面(开启缓存只需要对最后一级的路由添加该属性) */
    keepAlive?: boolean
    /** 菜单和面包屑对应的图标 */
    icon?: string
    /** 是否在菜单中隐藏 */
    hide?: boolean
    /** 外链链接 */
    href?: string
    /** 路由顺序，可用于菜单的排序 */
    order?: number
  }
}
