// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string
    fullPath: string
    title: string
    icon?: string
    isLink?: string
    close?: boolean
    children?: MenuOptions[]
  }
}

// * Vite
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_API_URL: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_GLOB_APP_TITLE: string
  VITE_DROP_CONSOLE: boolean
  VITE_PROXY_URL: string
  VITE_BUILD_GZIP: boolean
  VITE_REPORT: boolean
}

declare interface Company {
  id?: number | string
  company_name: string
  national_tax_pwd: string
  personal_tax_pwd: string
  taxpayer_name: string
  taxpayer_pwd: string
  legal_person_id_card: string
  legal_person_phone: string
  note: string
  [key: string]: any
}
