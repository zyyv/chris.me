import { vTypeWrite } from '@/directives'
import type { Plugin } from 'vue'

export function vDirective(): Plugin {
  return {
    install(app) {
      app.directive('typeWrite', vTypeWrite())
    }
  }
}
