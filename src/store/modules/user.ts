import { defineStore } from 'pinia'
import type { UserState } from '../interface'
import piniaPersistConfig from '~/config/piniaPersist'

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
  persist: piniaPersistConfig('UseUserStore'),
})
