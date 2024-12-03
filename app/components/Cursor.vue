<script lang="ts" setup>
import type { ICursorStyle } from '~/types'
import { useStorage } from '@vueuse/core'

const route = useRoute()
const pos = useStorage('dotPos', { x: 0, y: 0 })
const style = reactive<ICursorStyle>({
  dot: {
    top: `${pos.value.y}px`,
    left: `${pos.value.x}px`,
  },
  cursor: {},
  circle: {},
})

useCursor(style)

const { dotRef, domListener } = useDot(style)
watch(() => route.fullPath, () => {
  setTimeout(domListener, 500) // 等待 transition 时间片断完成
})
</script>

<template>
  <div
    id="dot"
    ref="dotRef"
    :style="style.dot"
    bg-white
    fixed
    z-99999
    opacity-0
    w5 h5
    pointer-events-none
    rounded-full
    trans
  />
  <div
    id="cursor"
    :style="style.cursor"
    z-99999
    fixed
    top-0
    left-0
    pointer-events-none
  >
    <div
      id="circle"
      class="mt--1/2 ml--1/2 border-gray4"
      border
      rounded-full
      w-16
      h-16
      trans duration-500
      :style="style.circle"
    />
  </div>
</template>

<style scoped>
#cursor {
  will-change: transform;
}

#dot {
  mix-blend-mode: difference;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: translate(-50%, -50%);
}

#circle {
  transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    width 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    height 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>

<style scoped>
html * {
  --uno: important-cursor-none;
}
</style>
