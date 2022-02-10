import { vTypeWrite } from './vtype'
import type { UserModule } from '@/types'

export const install: UserModule = (app) => {
  app.directive('typeWrite', vTypeWrite())
}
