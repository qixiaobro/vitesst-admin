import type { UserState } from '../types'

export const UseUserStore = defineStore({
  id: 'UseUserStore',
  state: (): UserState.UserInfo => ({
    id: '',
    account: '',
    head_pic: '',
    roles: '',
  }),
  getters: {},
  actions: {

  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'UserState',
        storage: sessionStorage,
        paths: ['id', 'account', 'head_pic', 'roles'],
      },
    ],
  },
})
