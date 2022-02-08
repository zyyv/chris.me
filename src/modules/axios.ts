
import { http } from '@/utils'
import type { UserModule } from '@/types'

export const install: UserModule = (app) => {
  const { $get, $delete, $post, $put } = http

  app.config.globalProperties.$get = $get
  app.config.globalProperties.$delete = $delete
  app.config.globalProperties.$post = $post
  app.config.globalProperties.$put = $put
}
