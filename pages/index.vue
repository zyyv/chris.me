<script lang="ts" setup>
useHead({
  title: 'Chris',
})
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div prose ma c-primary:75>
    <!-- <PersonInfo /> -->
    <h1 fsc gap-5>
      <ImgBlurHash
        class="transLogo"
        :src="user!.avatar_url"
        blurhash="U8B4RsM[08%j00og?ZR.%io$s:jVo$oeM^RP"
        alt="Avatar"
        w-10
        h-10
        rounded-full
      />
    </h1>
    <p>
      I'm <strong c-primary>Chris</strong>, front-end engineer 🧑🏻‍💻 & open source enthusiast.
    </p>
    <p>
      <i i-fluent-emoji-sparkles mr-1 />
      Team member of
      <a linkInProse o-red href="https://github.com/unocss/unocss" target="_blank"><strong>UnoCSS</strong></a>,
      <a linkInProse o-red href="https://github.com/elk-zone" target="_blank"><strong>Elk</strong> <sub bottom-0>farm</sub></a>,
      Creator of
      <a linkInProse o-red href="https://github.com/onu-ui" target="_blank"><strong>Onu UI</strong></a>
      <i i-fluent-emoji-sparkles ml-1 />
      <br>
      In the community, I am also a ecological contributors of the
      <a linkInProse o-blue href="https://github.com/vitejs/vite" target="_blank">Vite</a>、
      <a linkInProse o-blue href="https://github.com/vuejs-translations/docs-zh-cn" target="_blank">Vue</a>、
      <a linkInProse o-blue href="https://github.com/nuxt/framework" target="_blank">Nuxt</a> & etc.
      <i i-fluent-emoji-partying-face />
    </p>

    <p>
      I have a wide range of interests, watching anime, climbing mountains, listening to music, learning foreign
      languages, playing games... Recently I am learning to edit videos and I am going to be an
      <a linkInProse o-pink href="https://space.bilibili.com/402454160" target="_blank">Uploader <i i-ri-bilibili-line /></a>.
    </p>

    <p>
      <a trans text-p-r class="group" hover-op-75 href="http://" target="_blank" rel="noopener noreferrer">
        Hire Me
        <i trans group-hover="ml-2" i-ri:arrow-right-up-line bg-gradient-to-r />
      </a>
    </p>
  </div>
</template>
