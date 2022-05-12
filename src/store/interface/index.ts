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

/* UserStore */
export namespace UserState {
  export interface UserInfo {
    id: string
    account: string
    head_pic: string
    roles: string
  }
}
