import { Component, createApp, App } from 'vue'

export const createCtx = async(App: Component, fn?: (context: App) => Promise<void> | void, rootContainer = '#app') => {
  const context = createApp(App)
  await fn?.(context)
  context.mount(rootContainer)

  return context
}
