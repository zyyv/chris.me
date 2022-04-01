export function useHtml() {
  const html = `<p mb-6 base>
  console.log('如果你不喜欢这段动画，你可以点击右下角按钮，提前结束折磨')
</p>
<p mb-6 base>
  这段代码完全没用，只是为了让你觉得很酷🤣
</p>
<p mb-6 base>
  如果没有，那那那。。。打扰了😅，请跳过
</p>
`
  const htmlState = reactive({
    status: false,
    text: html,
  })

  return { htmlState }
}

export function useCss() {
  const css = `.display-enter-active {
  transition: all 1s ease-in-out;
}
.display-leave-active {
  transition: all 2s ease-in-out;
  .css,
  .html {
    transition: all 1s ease-in-out;
  }
}`
  const cssState = reactive({
    status: false,
    text: css,
  })
  return { cssState }
}
