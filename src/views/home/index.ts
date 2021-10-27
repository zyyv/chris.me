import { reactive } from 'vue'

export function useHtml() {
  const html = `<template>
  <div class="w-4/5 m-auto flex justify-between">
  import { computed, ref, watchEffect } from 'vue'
  import { NSwitch } from 'naive-ui'
  import { useCss, useHtml } from '.'
  
  const allDown = ref(false)
  const enableAnimate = computed(() => !allDown.value)
  
  const { htmlState } = useHtml()
  const { cssState } = useCss()
  </div>
</template>
`
  const htmlState = reactive({
    status: false,
    text: html
  })

  return { htmlState }
}

export function useCss() {
  const css = `<style lang="scss" scoped>

</style>
`
  const cssState = reactive({
    status: false,
    text: css
  })
  return { cssState }
}
