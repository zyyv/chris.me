import { Directive } from 'vue'

export function vTypeWrite(): Directive {
  return {
    mounted(el, binding) {
      let text = binding.value ?? (el.innerText || ``)
      el.innerText = ``
      let i = 0
      let timer: NodeJS.Timer | null = setInterval(() => {
        if ('<' === text.substr(i, 1)) {
          i = text.indexOf('>', i) + 1
        } else {
          i++
        }
        el.innerText = `${text.substring(0, i)}${i % 2 == 0 ? '_' : ''}`
        if (i >= text.length) {
          if (i % 2 == 0) {
            el.innerText = el.innerText.substring(0, el.innerText.length - 1)
          }
          clearInterval(timer as NodeJS.Timer)
          timer = null
        }
      }, 75)
    }
  }
}
