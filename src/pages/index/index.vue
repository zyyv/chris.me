<script lang="ts" setup name="Home">
import { useCss, useHtml } from '.'

const allDown = ref(false) // 两个模块是否都打印完成
const enableAnimate = ref(false) // 提前结束动画
const { htmlState } = useHtml()
const { cssState } = useCss()

watch(enableAnimate, (newVal) => {
  allDown.value = newVal
})

watchEffect(() => {
  if (htmlState.status && cssState.status) {
    allDown.value = true
    enableAnimate.value = true
  }
})

useTitle('Chris\' Blog')
</script>

<template>
  <div>
    <div class="w-4/5" m-auto pr>
      <transition name="display" mode="out-in">
        <div v-if="!allDown">
          <div
            class="html w-5/12"
            pa
            top-0
            left-0
            p-4
            b
            rounded-md
            border-main
          >
            <pre v-typeWrite="htmlState" text-justify whitespace-pre-wrap font-mono />
          </div>
          <div
            class="css w-5/12"
            pa
            top-0
            right-0
            p-4
            b
            rounded-md
            border-main
          >
            <pre v-typeWrite="cssState" whitespace-pre-wrap font-mono />
          </div>
        </div>
        <div v-else m-auto p-2 text-center border>
          <img inline-block width="200" :src="Logo">
        </div>
      </transition>
    </div>
    <div pa bottom-5 right-5>
      <Switch v-model:value="enableAnimate" :disabled="enableAnimate" size="small" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.display-enter-active {
  transition: all 1s ease-in-out;
}
.display-leave-active {
  transition: all 2s ease-in-out;

  .css,
  .html {
    transition: all 1s ease-in-out;
  }
}

.display-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.display-leave-to {
  opacity: 0;
  .css {
    right: 50%;
    transform: translateX(50%);
  }
  .html {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
