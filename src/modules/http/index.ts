import { HttpRequest } from '@/composables'
import type { UserModule } from '@/types'

export const http = HttpRequest.getInstance({
  baseURL: '' // 使用环境变量来区分 接口地址
  // message: 使用的UI库的 Message 方法
})

export const install: UserModule = (app) => {
  const { $get, $delete, $post, $put } = http

  app.config.globalProperties.$get = $get
  app.config.globalProperties.$delete = $delete
  app.config.globalProperties.$post = $post
  app.config.globalProperties.$put = $put
}
