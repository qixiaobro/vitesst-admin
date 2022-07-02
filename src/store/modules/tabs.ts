import type { TabPaneProps } from 'element-plus'
import type { TabsState } from '../types'
import { HOME_URL, TABS_BLACK_LIST } from '~/config/config'

export const UseTabsStore = defineStore({
  id: 'UseTabsStore',
  state: (): TabsState => ({
    tabsMenuValue: HOME_URL,
    tabsMenuList: [{ path: HOME_URL, fullPath: '/', title: '首页', close: false }],
  }),
  getters: {},
  actions: {
    // Add Tabs
    async addTabs(tabItem: Menu.TabOptions) {
      // not add tabs black list
      // 如果缓存里有tabsMenuValue 和 tabsMenuList，设置到tabStore
      if (sessionStorage.getItem('tabsMenuValue') && sessionStorage.getItem('tabsMenuList')) {
        this.tabsMenuValue = sessionStorage.getItem('tabsMenuValue')!
        this.tabsMenuList = JSON.parse(sessionStorage.getItem('tabsMenuList')!)
      }
      if (TABS_BLACK_LIST.includes(tabItem.path))
        return
      // 同一个路由，但是query参数不一样，需要关闭之前的tab
      for (let i = 0; i < this.tabsMenuList.length; i++) {
        if (this.tabsMenuList[i].path === tabItem.path && this.tabsMenuList[i].fullPath !== tabItem.fullPath) {
          this.tabsMenuList.splice(i, 1)
          break
        }
      }
      if (this.tabsMenuList.every(item => item.path !== tabItem.path))
        this.tabsMenuList.push(tabItem)

      this.setTabsMenuValue(tabItem.fullPath)
      this.saveTabsMenuValueAndList()
    },
    // Remove Tabs
    async removeTabs(tabPath: string) {
      let tabsMenuValue = this.tabsMenuValue
      const tabsMenuList = this.tabsMenuList
      if (tabsMenuValue === tabPath) {
        tabsMenuList.forEach((item, index) => {
          if (item.fullPath !== tabPath)
            return
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
          if (!nextTab)
            return
          tabsMenuValue = nextTab.fullPath
          router.push(nextTab.fullPath)
        })
      }
      this.tabsMenuValue = tabsMenuValue
      this.tabsMenuList = tabsMenuList.filter(item => item.fullPath !== tabPath)
      this.saveTabsMenuValueAndList()
    },
    // Change Tabs
    async changeTabs(tabItem: TabPaneProps) {
      this.tabsMenuList.forEach((item) => {
        if (item.title === tabItem.label)
          router.push(item.fullPath)
      })

      this.saveTabsMenuValueAndList()
    },
    // Set TabsMenuValue
    async setTabsMenuValue(tabsMenuValue: string) {
      this.tabsMenuValue = tabsMenuValue

      this.saveTabsMenuValueAndList()
    },
    // Set TabsMenuList
    async setTabsMenuList(tabsMenuList: Menu.TabOptions[]) {
      this.tabsMenuList = tabsMenuList

      this.saveTabsMenuValueAndList()
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.fullPath === tabsMenuValue || item.fullPath === HOME_URL
      })

      this.saveTabsMenuValueAndList()
    },
    // 保存tabsMenuValue 和 tabsMenuList到sessionStorage
    async saveTabsMenuValueAndList() {
      sessionStorage.setItem('tabsMenuValue', this.tabsMenuValue)
      sessionStorage.setItem('tabsMenuList', JSON.stringify(this.tabsMenuList))
    },
    // Go Home
    async goHome() {
      router.push(HOME_URL)
      this.tabsMenuValue = HOME_URL
      this.saveTabsMenuValueAndList()
    },
  },
})
