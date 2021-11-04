<template>
  <div
    class="dot"
    z-99999
    opacity-0
    pointer-events-none
    rounded-full
    fixed
    ref="dotRef"
    :style="style.dot"
  ></div>
  <div
    id="cursor"
    fixed
    top-0
    left-0
    z-99999
    pointer-events-none
    :style="style.cursor"
  >
    <div class="circle" rounded-full w-16 h-16 :style="style.circle"></div>
  </div>
</template>

<script lang="ts" setup>
import { ICursorStyle } from '@/types'
import { reactive } from 'vue'
import { useCursor, useDot } from './index'

const style = reactive<ICursorStyle>({
  dot: {},
  cursor: {},
  circle: {}
})

useCursor(style)

const { dotRef } = useDot(style)
</script>
<style lang="scss" scoped>
#cursor {
  will-change: transform;
}

.dot {
  mix-blend-mode: normal;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  width: 9px;
  height: 9px;
  transform: translate(-50%, -50%);
  background-color: #adbac7;
}
.circle {
  margin-top: -50%;
  margin-left: -50%;
  border: solid 1px #adbac7;
  transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    width 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    height 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>
