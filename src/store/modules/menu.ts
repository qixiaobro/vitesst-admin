import type { MenuState } from '../interface'

export const UseMenuStore = defineStore({
  id: 'UseMenuStore',
  state: (): MenuState => ({
    isCollapse: false,
    menuList: [],
  }),
  getters: {},
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setMenuList(menuList: Menu.MenuOptions[]) {
      this.menuList = menuList
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'MenuState',
        storage: sessionStorage,
        paths: ['isCollapse', 'menuList'],
      },
    ],
  },
})
