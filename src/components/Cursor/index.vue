<script lang="ts" setup>
import { useCursor, useDot } from './index'
import { ICursorStyle } from '@/types'

const style = reactive<ICursorStyle>({
  dot: {},
  cursor: {},
  circle: {}
})

useCursor(style)

const { dotRef } = useDot(style)
</script>

<template>
  <div
    id="dot"
    ref="dotRef"
    :style="style.dot"
    class="bg-$default"
    z-99999
    opacity-0
    pointer-events-none
    rounded-full
    fixed
  ></div>
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
      class="mt--1/2 ml--1/2 border-$default"
      border
      rounded-full
      w-16
      h-16
      :style="style.circle"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
#cursor {
  will-change: transform;
}

#dot {
  mix-blend-mode: normal;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  width: 9px;
  height: 9px;
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
