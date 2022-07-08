<script lang="ts" setup>
import { useTitle } from '@vueuse/core'

const { data } = await useFetch('/api/user')
const user = data

useTitle('Chris\' Blog')
</script>

<template>
  <div prose ma base>
    <div flex flex-col items-center md="gap-10 flex-row">
      <img
        w-30
        h-30
        md="w-50 h-50"
        rounded-full
        :src="user?.avatar_url"
        alt=""
        srcset=""
      >
      <div>
        <h1 fic justify-center md="justify-start">
          {{ user?.name }}
        </h1>
        <p text-lg font-sans text-center md="text-left">
          {{ user?.bio }}
        </p>
        <div fic gap-4 justify-center md="justify-start">
          <div fic gap-2>
            <div class="text-3.5" i-carbon-building />
            {{ user?.company }}
          </div>
          <div fic gap-2>
            <div class="text-3.5" i-carbon-location />
            {{ user?.location }}
          </div>
          <div fic gap-2>
            <div class="text-3.5" i-carbon-campsite />
            {{ user?.blog }}
          </div>
        </div>
        <div my-4 fic justify-center md="justify-start">
          <div i-carbon-user-favorite-alt-filled mr2 />
          <span>
            {{ user?.followers }}
            <span class="text-xs">
              followers
            </span>
          </span>
          <span mx-2>·</span>
          <span>
            {{ user?.following }}
            <span class="text-xs">
              following
            </span>
          </span>
        </div>
        <p />
      </div>
    </div>
    <p>
      ✨ <a href="https://github.com/unocss/unocss" target="_blank" link><strong>UnoCSS</strong></a>、<a
        link
        href="https://github.com/vitejs/vite"
        target="_blank"
      >Vite</a>、<a
        link
        href="https://github.com/nuxt/framework"
        target="_blank"
      >Nuxt3</a>、<a
        link
        href="https://github.com/vuejs-translations/docs-zh-cn"
        target="_blank"
      >Vue3-docs</a>、<a
        link
        href="https://github.com/element-plus/element-plus"
        target="_blank"
      >element-plus</a> & etc. 积极贡献者✨
    </p>
    <p>
      Introduce: 前端工程师 🧑🏻‍💻 专注于Vue3、Vite、Nuxt3 & UnoCSS的生态环境。同时我也是Creator of <a
        linkOrg
        href="https://github.com/onu-ui/onu-ui"
        target="_blank"
      >ONU-UI</a>，<a
        linkOrg
        href="https://github.com/unocss"
        target="_blank"
      >UnoCSS</a>、<a
        linkOrg
        href="https://github.com/developer-plus"
        target="_blank"
      >developer-plus</a> team member。
    </p>

    <p>
      一个喜欢编程的人，喜欢造各种轮子，写脚本。现居住在美丽的四川成都。
    </p>
    <p>
      兴趣广泛，看动漫、爬山、听音乐、学外语、打游戏···最近在学习剪辑视频，准备做一名 <a
        href="https://space.bilibili.com/402454160"
        target="_blank"
        linkOutside
      >Up主</a>。
    </p>
    <p>
      对了，我也喜欢旅行，拍照，你也可以简单<nuxt-link to="/" class="linkBtn">
        看看
      </nuxt-link>我的作品🤪。
    </p>
  </div>
</template>
