import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    info: {
      name: 'hahah'
    }
  }),
  actions: {
    // async login(account: string, pwd: string) {
    //   console.log(account, pwd)
    // }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
