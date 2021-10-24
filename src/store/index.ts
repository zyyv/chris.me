import { createPinia } from 'pinia'
import { piniaPluginPersist } from '@/plugins'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

export default pinia
