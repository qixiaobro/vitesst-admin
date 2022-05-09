/* MenuStore */
export interface MenuState {
  isCollapse: boolean
  menuList: Menu.MenuOptions[]
}

/* TabsStore */
export interface TabsState {
  tabsMenuValue: string
  tabsMenuList: Menu.MenuOptions[]
}

export interface AuthButtonsState {
  authorButtons: Record<string, any>
}
