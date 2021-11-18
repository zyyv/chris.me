
import { vTypeWrite } from '@/directives'
import { UserModule } from '@/types'

export const install: UserModule = (app) => {
  app.directive('typeWrite', vTypeWrite())
}
