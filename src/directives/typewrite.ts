import { Directive } from 'vue'

export function vTypeWrite(): Directive {
  return {
    mounted(el, binding) {
      console.log(binding)

      let text = binding.value ?? (el.innerText || ``)
      el.innerText = ``
      let i = 0
      let s = setInterval(() => {
        '<' == text.substr(i, 1) ? (i = text.indexOf('>', i) + 1) : i++,
          (el.innerText = text.substring(0, i) + (i % 2 == 0 ? '_' : '')),
          i >= text.length &&
            (clearInterval(s),
            '_' == el.innerText.substr(el.innerText.length - 1, 1) &&
              (el.innerText = el.innerText.substring(
                0,
                el.innerText.length - 1
              )))
      }, 75)
    }
  }
}
