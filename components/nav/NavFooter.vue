<template>
  <div
    backdrop-blur
    pf
    bottom-0
    left-0
    right-0
    px-4
    py-2
    fbc
  >
    <div>
      <!-- TODO Command panel -->
      <a fsc text-xs gap-1 hover-text-purple>
        <div i-ri:command-line cursor-pointer />
        + K <sub>(WIP)</sub>
      </a>
    </div>
    <div text="xs gray4" flex justify-center gap-3>
      <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2022005364号</a>
      2022 ©
      <a href="mailto:zyyz2@qq.com" target="_blank">Chris</a>
    </div>
    <Timer />
  </div>
</template>
