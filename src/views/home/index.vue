<script lang="ts">
export default {
  name: 'Home'
}
</script>
<script lang="ts" setup>
import { useCss, useHtml } from '.'

onMounted(() => {
  console.log("home mounted")
})

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
</script>

<template>
  <div>
    <div class="w-4/5 m-auto relative">
      <transition name="display" mode="out-in">
        <div v-if="!allDown">
          <div class="html w-5/12" absolute top-0 left-0 p-4 border rounded-md border-main>
            <pre class="text-justify whitespace-pre-wrap" v-typeWrite="htmlState"></pre>
          </div>
          <div class="css w-5/12" absolute top-0 right-0 p-4 border rounded-md border-main>
            <pre v-typeWrite="cssState" class="whitespace-pre-wrap"></pre>
          </div>
        </div>
        <div m-auto p-2 text-center border v-else>
          <img inline-block width="200" src="@a/logo.svg" />
        </div>
      </transition>
    </div>
    <div absolute bottom-5 right-5>
      <Switch :disabled="enableAnimate" v-model:value="enableAnimate" size="small" />
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
