<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
const { data } = await useFetch('/api/user')
const user = data.value

const userStore = useUserStore()
userStore.setUser(user)

</script>

<template>
  <NuxtLayout>
    <div prose ma>
      <div flex flex-col items-center md="gap-10 flex-row">
        <img
          w-30
          h-30
          md="w-50 h-50"
          rounded-full
          :src="user.avatar_url"
          alt=""
          srcset=""
        >
        <div>
          <h1 fic justify-center md="justify-start">
            {{ user.name }}
            <a
              op50
              hover-op100
              trans
              duration-300
              ml2
              text-6
              i-carbon-logo-github
              :href="user.html_url"
              target="_blank"
            />
          </h1>
          <p text-lg font-sans text-center md="text-left">
            {{ user.bio }}
          </p>
          <div fic gap-4 justify-center md="justify-start">
            <div fic gap-2>
              <div class="text-3.5" i-carbon-building />
              {{ user.company }}
            </div>
            <div fic gap-2>
              <div class="text-3.5" i-carbon-location />
              {{ user.location }}
            </div>
            <div fic gap-2>
              <div class="text-3.5" i-carbon-campsite />
              {{ user.blog }}
            </div>
          </div>
          <div my-4 fic justify-center md="justify-start">
            <div i-carbon-user-favorite-alt-filled mr2 />
            <span>
              {{ user.followers }}
              <span class="text-xs">
                followers
              </span>
            </span>
            <span mx-2>·</span>
            <span>
              {{ user.following }}
              <span class="text-xs">
                following
              </span>
            </span>
          </div>
          <p />
        </div>
      </div>
      <p>
        ✨ <strong>UnoCSS</strong>、Vite、Nuxt3、Vue3-docs、Element-plus & etc. 积极贡献者✨
      </p>
      <p>
        Introduce: 前端工程师 🧑🏻‍💻 专注于Vue3、Vite、Nuxt3 & UnoCSS的生态环境。同时我也是Creator of `ONU-UI`，`developer-plus`` team member。
      </p>

      <p>
        嗨，你好，我是Chris，一个喜欢编程的人，现居住在美丽的四川成都。
      </p>
      <p>
        兴趣广泛，看动漫、爬山、听音乐、学外语、打游戏···最近在学习剪辑视频，准备做一名Up主。
      </p>
      <p>
        对了，我也喜欢旅行，拍照，你也可以简单看看。
      </p>
    </div>
  </NuxtLayout>
</template>
