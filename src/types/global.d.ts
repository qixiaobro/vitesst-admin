// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string
    name:string,
    meta: RouteMeta
    children?: MenuOptions[]
  }
  interface TabOptions{
    path: string,
    fullPath: string,
    title:string,
    icon?: string,
    close?: boolean
  }
}