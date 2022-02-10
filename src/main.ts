import App from './App.vue'
import { createCtx } from './composables'
import 'uno.css'
import '@/styles/index.css'

createCtx(App, app => Object.values(import.meta.globEager('./modules/*/index.ts')).forEach(i => i.install?.(app)))
