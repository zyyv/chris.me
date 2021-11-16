import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import { httpRequest, vDirective } from './plugins'
import 'uno.css'
import '@/styles/index.scss'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(createI18n({}))
app.use(httpRequest())
app.use(vDirective())
app.mount('#app')
