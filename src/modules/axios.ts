
import { UserModule } from '@/types'
import { http } from '@/utils'

export const install: UserModule = (app) => {
    const { $get, $delete, $post, $put } = http

    app.config.globalProperties.$get = $get
    app.config.globalProperties.$delete = $delete
    app.config.globalProperties.$post = $post
    app.config.globalProperties.$put = $put
}
