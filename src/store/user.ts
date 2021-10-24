import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    info: {
      name: 'hahah'
    }
  }),
  actions: {
    async login(account: string, pwd: string) {}
  }
})
