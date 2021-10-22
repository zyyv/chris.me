import { InjectionKey } from 'vue'
import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore
} from 'vuex'
import type { RootStateTypes, AllStateTypes } from '@/types'
import user from './modules/user'

const debug = process.env.NODE_ENV !== 'production'

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export const store = createStore<RootStateTypes>({
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key)
}
