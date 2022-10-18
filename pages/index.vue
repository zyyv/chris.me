<script lang="ts" setup>
import { useTitle } from '@vueuse/core'

const { data: user } = await useFetch('/api/user')

useTitle('Chris\' Blog')
</script>

<template>
  <div prose font-mono ma base>
    <div flex flex-col items-center md="gap-10 flex-row">
      <img w-30 h-30 md="w-50 h-50" rounded-full :src="user?.avatar_url" alt="" srcset="">
      <div>
        <h1 fic justify-center md="justify-start">
          {{ user?.name }}
        </h1>
        <p text-lg text-center md="text-left">
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
      ✨ <a href="https://github.com/unocss/unocss" target="_blank" link><strong>UnoCSS</strong></a> team member、<a link
        href="https://github.com/vitejs/vite" target="_blank">Vite</a>、<a link
        href="https://github.com/vuejs-translations/docs-zh-cn" target="_blank">Vue3</a>、<a link
        href="https://github.com/nuxt/framework" target="_blank">Nuxt3</a> & etc. Ecological contributors ✨
    </p>
    <p>
      Introduce: Front-end Engineer 🧑🏻‍💻 Focus on UnoCSS, Vite, Vue & Nuxt3。At the same time, I am also the Creator
      of <a linkOrg href="https://github.com/onu-ui/onu-ui" target="_blank"
        title="Just a awesome ui library toys now.">Onu-UI</a>.
    </p>

    <p>
      A person who likes programming, likes to build all kinds of wheels and write scripts. Now living in the beautiful
      Chengdu, China.
    </p>
    <p>
      I have a wide range of interests, watching anime, climbing mountains, listening to music, learning foreign
      languages, playing games... Recently I am learning to edit videos and I am going to be an <a
        href="https://space.bilibili.com/402454160" target="_blank" linkOutside>Uploader</a>.
    </p>
    <p>
      By the way, I also like to travel and take pictures, you can also simply <nuxt-link to="/" class="linkBtn">
        take a look
      </nuxt-link> at my works 🤪.
    </p>
  </div>
</template>
