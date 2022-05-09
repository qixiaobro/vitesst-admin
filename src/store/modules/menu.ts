import { defineStore } from 'pinia'
import type { MenuState } from '../interface'
import piniaPersistConfig from '~/config/piniaPersist'

export const UseMenuStore = defineStore({
  id: 'UseMenuStore',
  state: (): MenuState => ({
    isCollapse: false,
    menuList: [],
  }),
  getters: {},
  actions: {
    async setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    async setMenuList(menuList: Menu.MenuOptions[]) {
      this.menuList = menuList
    },
  },
  persist: piniaPersistConfig('UseMenuStore'),
})
