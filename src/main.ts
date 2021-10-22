import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { store, key } from '@/store'
import { HttpRequest } from './plugins'
import '@/styles/index.scss'

const app = createApp(App)
app.use(router)
app.use(store, key)
app.use(HttpRequest())
app.mount('#app')
