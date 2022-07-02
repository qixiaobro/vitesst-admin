import type { MenuState } from '../types'

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
    asyncGenerateMenu() {
      const menuList: Menu.MenuOptions[] = generateMenu(routes)
      this.menuList = menuList
    },
  },
})
