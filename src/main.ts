import App from './App.vue'
import { createCtx } from './use'
import 'uno.css'
import '@/styles/index.css'

createCtx(App, (ctx) => {
  Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
})
