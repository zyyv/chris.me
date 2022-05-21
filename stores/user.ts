import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from '~~/types'

export const useUserStore = defineStore('user', () => {
  const state = reactive<{ user: User | null }>({
    user: null,
  })

  const setUser = (u: User) => {
    state.user = u
  }
  return {
    ...toRefs(state),
    setUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
