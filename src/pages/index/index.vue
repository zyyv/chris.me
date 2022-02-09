<script lang="ts" setup name="Home">
import { useCss, useHtml } from '.'
const { t } = useI18n()

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
    <transition name="display" mode="out-in">
      <div v-if="!allDown" pr m-auto class="w-4/5">
        <div
          class="html w-5/12"
          pa
          top-0
          left-0
          p-4
          border="1 gray-300 dark:gray-700"
          rounded-md
          toDark
        >
          <pre v-typeWrite="htmlState" base text-justify whitespace-pre-wrap font-mono />
        </div>
        <div
          class="css w-5/12"
          pa
          top-0
          right-0
          p-4
          border="1 gray-300 dark:gray-700"
          rounded-md
          toDark
        >
          <pre v-typeWrite="cssState" base whitespace-pre-wrap font-mono />
        </div>
      </div>
      <div v-else class="max-w-75ch" m-auto p-2>
        <div mb-8 f-c justify-start>
          <div mr-10 text-0>
            <img w-40 h-40 rounded-full :src="Avatar" alt="Avatar">
          </div>
          <div>
            <h1 mb-6 font-lobster>
              <Navlink class="!text-purple-400" f-c inline-flex to="https://github.com/chris-zhu">
                Chris-Zhu
                <div ml-2 inline-block i-carbon:logo-github />
              </Navlink>
            </h1>
            <p leading-7 base>
              {{ t('home.desc.one') }}
            </p>
            <p leading-7 base>
              {{ t('home.desc.two') }}
            </p>
          </div>
        </div>
        <p mb-6 base>
          {{ t("home.intro0") }}
        </p>
        <p mb-6 base>
          {{ t('home.intro1.line1') }}
          <Navlink class="!text-red-300" to="https://github.com/unocss/unocss">
            Unocss
          </Navlink>&
          <Navlink
            class="!text-red-300"
            to="https://github.com/vuejs-translations/docs-zh-cn"
          >
            vuejs-translations/docs-zh-cn
          </Navlink>{{ t('home.intro1.line2') }}
        </p>
        <p mb-6 base>
          {{ t('home.intro2.desc') }} <Navlink
            class="!text-red-300"
            to="https://space.bilibili.com/402454160"
          >
            {{ t('home.intro2.uploader') }}
          </Navlink>
        </p>
        <p mb-6 base>
          {{ t('home.intro3.desc') }}
          <Navlink class="!text-red-300" to="/photoes">
            {{ t('home.intro3.look') }}
          </Navlink>
        </p>
        <p text="sm gray-400">
          <Navlink
            hover:text-red-300
            to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            CC BY-NC-SA 4.0
          </Navlink>2022 © Chris-Zhu
        </p>
      </div>
    </transition>
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
