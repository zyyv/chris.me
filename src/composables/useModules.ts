import type { App, Component } from 'vue'

export const createCtx = async(App: Component, fn?: (app: App) => Promise<void> | void, rootContainer = '#app') => {
  const app = createApp(App)
  await fn?.(app)
  app.mount(rootContainer)

  return app
}
