import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import { pinia } from './store'
import { httpRequest, vDirective } from './plugins'
import 'uno.css'
import '@/styles/index.scss'

const router = createRouter({ routes: setupLayouts(generatedRoutes), history: createWebHistory() })

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(createI18n({}))
app.use(httpRequest())
app.use(vDirective())
app.mount('#app')
