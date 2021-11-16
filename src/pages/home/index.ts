import { reactive } from 'vue'

export function useHtml() {
  const html = `<transition name="display" mode="out-in">
  <div v-if="!allDown">
    <div class="html w-5/12" absolute top-0 left-0 p-4 border rounded-md border-main>
      <pre v-typeWrite="htmlState" text-justify whitespace-pre-wrap font-mono></pre>
    </div>
    <div class="css w-5/12" absolute top-0 right-0 p-4 border rounded-md border-main>
      <pre v-typeWrite="cssState" whitespace-pre-wrap font-mono></pre>
    </div>
  </div>
  <div m-auto p-2 text-center border v-else>
    <img inline-block width="200" src="@a/logo.svg" />
  </div>
</transition>
`
  const htmlState = reactive({
    status: false,
    text: html
  })

  return { htmlState }
}

export function useCss() {
  const css = `<style lang="scss" scoped>
  ··· // 省略部分样式
</style>`
  const cssState = reactive({
    status: false,
    text: css
  })
  return { cssState }
}
