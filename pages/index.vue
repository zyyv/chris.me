<script lang="ts" setup>
useHead({
  title: 'Chris',
})
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div prose ma>
    <!-- <PersonInfo /> -->
    <h1 fsc gap-5>
      <ImgBlurHash
        class="transitionImg"
        :src="user!.avatar_url"
        blurhash="U8B4RsM[08%j00og?ZR.%io$s:jVo$oeM^RP"
        alt="Avatar"
        w-10
        h-10
        rounded-full
      />
      <NuxtLink to="/" title="Home" class="transitionLogo">
        <img v-show="isDark" h-6 src="/logo-light.svg" alt="logo">
        <img v-show="!isDark" h-6 src="/logo.svg" alt="logo">
      </NuxtLink>
    </h1>
    <p>
      Hi, I'm Chris, front-end engineer 🧑🏻‍💻 from China & open source enthusiast.
    </p>
    <p>
      ✨
      <a href="https://github.com/unocss/unocss" target="_blank" link><strong>UnoCSS</strong></a> team member、
      <a href="https://github.com/elk-zone" target="_blank" link><strong>Elk</strong></a> <sub bottom-0>farm</sub> team
      member、
      Creator of <a href="https://github.com/onu-ui" target="_blank" link><strong>Onu UI</strong></a>
      ✨
      <br>
      In the community, I am also a ecological contributors of the
      <a linkOrg href="https://github.com/vitejs/vite" target="_blank">Vite</a>、
      <a linkOrg href="https://github.com/vuejs-translations/docs-zh-cn" target="_blank">Vue</a>、
      <a linkOrg href="https://github.com/nuxt/framework" target="_blank">Nuxt</a> & etc. ✌
    </p>

    <p>
      I have a wide range of interests, watching anime, climbing mountains, listening to music, learning foreign
      languages, playing games... Recently I am learning to edit videos and I am going to be an <a
        href="https://space.bilibili.com/402454160"
        target="_blank"
        linkOutside
      >Uploader</a>.
    </p>

    <p>
      <a text-purple href="http://" target="_blank" rel="noopener noreferrer">Hire Me <span i-ri:arrow-right-up-line /></a>
    </p>
  </div>
</template>

<style scoped>
.transitionLogo{
  view-transition-name: logo;
}
.transitionImg{
  view-transition-name: img
}

/* .aaa{
  view-transition-name: selected-film
} */
</style>
