import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { HttpRequest } from './plugins'
import '@/styles/index.scss'

const app = createApp(App)
app.use(router)
app.use(HttpRequest())
app.mount('#app')
