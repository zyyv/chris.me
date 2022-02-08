import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { UserModule } from '@/types'

export const install: UserModule = (app) => {
  const router = createRouter({ routes: setupLayouts(generatedRoutes), history: createWebHistory() })
  app.use(router)
}
