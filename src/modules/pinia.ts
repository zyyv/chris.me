import { createPinia } from 'pinia'
import { piniaPluginPersist } from '@/plugins'
import { UserModule } from '@/types'

export const install: UserModule = (app) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersist)
  app.use(pinia)
}
