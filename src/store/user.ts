import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    info: {
      name: 'hahah'
    }
  }),
  actions: {
    async login(account: string, pwd: string) {}
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})
