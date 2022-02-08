import { vTypeWrite } from '@/directives'
import type { UserModule } from '@/types'

export const install: UserModule = (app) => {
  app.directive('typeWrite', vTypeWrite())
}
