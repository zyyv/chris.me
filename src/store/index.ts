import { createPinia } from 'pinia'
import { piniaPluginPersist } from '@/plugins'
export * from './user'

export const pinia = createPinia()
pinia.use(piniaPluginPersist)
