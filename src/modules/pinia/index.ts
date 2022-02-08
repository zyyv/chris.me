import { piniaPluginPersist } from '@/plugins'
import type { UserModule } from '@/types'

export const pinia = createPinia()

pinia.use(piniaPluginPersist)

export const install: UserModule = app => app.use(pinia)

export * from './user'
