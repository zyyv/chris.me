export function useHtml() {
  const html = `<p mb-6 base>
  console.log('qishimeishayong, dankanqilaihenku!')
</p>
<p mb-6 base>
  Github开源社区的积极贡献者。为
  <Navlink> Unocss </Navlink> & <Navlink> vuejs-translations/docs-zh-cn </Navlink>等贡献多个pr
</p>
<p mb-6 base>
  兴趣广泛，看动漫、爬山、听音乐、学外语、打游戏···最近在学习剪辑视频，准备做一名Up主
</p>
`
  const htmlState = reactive({
    status: false,
    text: html
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
  }
  `
  const cssState = reactive({
    status: false,
    text: css
  })
  return { cssState }
}
