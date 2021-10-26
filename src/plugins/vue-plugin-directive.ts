import { vTypeWrite } from '@/directives'
import { Plugin } from 'vue'

export function vDirective(): Plugin {
  return {
    install(app) {
      app.directive('typeWrite', vTypeWrite())
    }
  }
}
