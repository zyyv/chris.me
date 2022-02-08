<script lang="ts" setup name="Home">
import { useCss, useHtml } from '.'

// const allDown = ref(true) // 两个模块是否都打印完成
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
          b
          rounded-md
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
        >
          <pre v-typeWrite="cssState" whitespace-pre-wrap font-mono />
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
              Front-end Engineer 🧑🏻‍💻 Focus on Vue, Vite & Unocss.
            </p>
            <p leading-7 base>
              ✨ Open source community contributors ✨
            </p>
          </div>
        </div>
        <p mb-6 base>
          <!-- Hi, I am Chris, a person who loves programming, living in Chengdu, Sichuan. -->
          嗨，你好，我是朱颖，一个喜欢编程的人，现居住在美丽的四川成都
        </p>
        <p mb-6 base>
          3年的工作经验，Github开源社区的积极贡献者。为
          <Navlink class="!text-red-300" to="https://github.com/unocss/unocss">
            Unocss
          </Navlink>&
          <Navlink
            class="!text-red-300"
            to="https://github.com/vuejs-translations/docs-zh-cn"
          >
            vuejs-translations/docs-zh-cn
          </Navlink>等贡献多个pr。喜欢学习探索框架源码，梦想造一个很Cool的轮子。
        </p>
        <p mb-6 base>
          兴趣广泛，看动漫、爬山、听音乐、学外语、打游戏···最近在学习剪辑视频，准备做一名<Navlink
            class="!text-red-300"
            to="https://space.bilibili.com/402454160"
          >
            Up
          </Navlink>主
        </p>
        <p mb-6 base>
          对了，我也喜欢旅行，拍照，你也可以简单
          <Navlink class="!text-red-300" to="/photoes">
            看看
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
