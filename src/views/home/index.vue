<template>
  <div>
    <div class="w-4/5 m-auto relative">
      <transition name="display" mode="out-in">
        <div v-if="!allDown">
          <div
            class="
              html
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
            <pre
              class="text-justify whitespace-pre-wrap"
              v-typeWrite="htmlState"
            ></pre>
          </div>
          <div
            class="
              css
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
            <pre v-typeWrite="cssState" class="whitespace-pre-wrap"></pre>
          </div>
        </div>
        <div class="userCard w-1/2 text-center m-auto border" v-else>
          <img class="inline-block" width="200" src="@a/logo.svg" />
        </div>
      </transition>
    </div>
    <div class="absolute bottom-5 right-5">
      <n-switch
        size="small"
        :disabled="enableAnimate"
        v-model:value="enableAnimate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, watchEffect, onMounted } from 'vue'
import { NSwitch } from 'naive-ui'
import { useCss, useHtml } from '.'

const allDown = ref(false) // 两个模块是否都打印完成
const enableAnimate = ref(false) // 提前结束动画
const { htmlState } = useHtml()
const { cssState } = useCss()

onMounted(() => {
  console.log('home mounted')
})

watch(enableAnimate, (newVal) => {
  allDown.value = newVal
})

watchEffect(() => {
  if (htmlState.status && cssState.status) {
    allDown.value = true
    enableAnimate.value = true
  }
})
</script>
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
