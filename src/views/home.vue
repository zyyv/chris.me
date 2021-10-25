<template>
  <div class="w-4/5 m-auto relative">
    <div
      class="
        absolute
        w-5/12
        top-0
        left-0
        p-4
        border
        rounded-md
        border-main
      "
    >
      <pre class="text-justify whitespace-pre-wrap" v-typeWrite="html"></pre>
    </div>
    <div
      class="
        absolute
        w-5/12
        top-0
        right-0
        p-4
        border
        rounded-md
         border-main
      "
    >
      <pre v-typeWrite="css" class="whitespace-pre-wrap"></pre>
    </div>
  </div>
  <div class="absolute bottom-5 right-5">
    <n-switch v-model:value="enableAnimate">
    </n-switch>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NSwitch } from 'naive-ui'
const enableAnimate = ref(true)

let html = `<template>
  <div class="w-4/5 m-auto flex justify-between">
    <div class="flex-1 mr-5">
      <div style="text-align: justify; word-wrap: break-word" v-typeWrite>
        大家好，我是朱颖（Chris）,欢迎光临我的博客，这是我的自我介绍。
        大家好，我是朱颖（Chris）,欢迎光临我的博客，这是我的自我介绍。
        大家好，我是朱颖（Chris）,欢迎光临我的博客，这是我的自我介绍。
        大家好，我是朱颖（Chris）,欢迎光临我的博客，这是我的自我介绍。
        大家好，我是朱颖（Chris）,欢迎光临我的博客，这是我的自我介绍。
      </div>
    </div>
    <div class="flex-1 ml-5">
      <pre v-typeWrite="add" style="white-space: pre-wrap"></pre>
    </div>
  </div>
</template>
`

let css = `<style lang="scss" scoped>
$circlePath: calc(v-bind(c_radius) * 2);
$radius: v-bind(c_radius);
.Glassmorphism {
  width: v-bind(c_width);
  height: v-bind(c_height);
  backdrop-filter: blur(6px);
  box-shadow: 0.8rem 0.8rem 1.3rem 0 rgba(0, 0, 0, 0.15);
}
</style>
`
</script>
<style lang="scss" scoped></style>
