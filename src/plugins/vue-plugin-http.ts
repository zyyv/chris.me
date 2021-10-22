import { App } from 'vue'
import { http } from '@/utils'

export function HttpRequest() {
  return {
    install: (app: App) => {
      const { $get, $delete, $post, $put } = http

      app.config.globalProperties.$get = $get
      app.config.globalProperties.$delete = $delete
      app.config.globalProperties.$post = $post
      app.config.globalProperties.$put = $put
    }
  }
}
