import type { Directive } from 'vue'

interface ITypeState {
  status: boolean
  text: string
}

function useTypeing(el: HTMLElement, value: ITypeState | string) {
  let text: string
  if (typeof value === 'object') {
    text = value.text
    value.status = false
  } else {
    text = value
  }
  el.innerText = ''
  let i = 0
  let timer: any = setInterval(() => {
    if (text.substr(i, 1) === '<')
      i = text.indexOf('>', i) + 1
    else i++

    el.innerText = `${text.substring(0, i)}${i % 2 === 0 ? '_' : ''}`
    if (i >= text.length) {
      if (i % 2 === 0)
        el.innerText = el.innerText.substring(0, el.innerText.length - 1)

      clearInterval(timer)
      timer = null
      if (typeof value === 'object')
        value.status = true
    }
  }, 75)
}

export function vTypeWrite(): Directive {
  return {
    mounted(el: HTMLElement, binding) {
      const defaultText = el.innerText || ''
      const { value = defaultText } = binding
      useTypeing(el, value)
    }
  }
}
