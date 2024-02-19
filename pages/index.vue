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
      <UserAvatar />
    </h1>
    <p>
      I'm <strong c-primary>{{ user?.name }}</strong>, front-end engineer 🧑🏻‍💻 & open source enthusiast.
    </p>
    <p italic>「 {{ user?.bio }} 」</p>
    <p>
      <i i-fluent-emoji-sparkles mr-1 />
      Team member of
      <i i-my-logos-unocss mr-1 />
      <a trans linear-text shape-bl class="c-context::#818181" from="#ccc" via="#858585" to="#4d4d4d" href="https://github.com/unocss/unocss" target="_blank"><strong> UnoCSS</strong></a>,
      <i i-my-logos-elk mr-1 />
      <a linkInProse o="#c18139" href="https://github.com/elk-zone" target="_blank"><strong>Elk</strong> <sub bottom-0>farm</sub></a>,
      Creator of
      <i i-my-logos-onu-ui w-1.1em h-1.1em mr-1 />
      <a trans linear-text shape-bl class="c-context::#C084FC" from="#ACC1EE" to="#C084FC" href="https://github.com/onu-ui" target="_blank"><strong>Onu UI</strong></a>,
      <i i-my-logos-unpreset w-1.1em h-1.1em mr-1 />
      <a trans linear-text shape-bl class="c-context::#DBE74F" from="#FF5C5C" to="#DBE74F" href="https://github.com/unpreset" target="_blank"><strong>UnPreset</strong></a>
      <i i-fluent-emoji-sparkles ml-1 />
      <br>
      In the community, I am also a ecological contributors of the
      <i i-logos-vitejs w-1.1em h-1.1em mr-1 />
      <a trans linear-text shape-bottom-right class="c-context::#bd34fe" from="#41d1ff" to="#bd34fe" href="https://github.com/vitejs/vite" target="_blank">Vite</a>、
      <i i-logos-vue w-1.1em h-1.1em mr-1 />
      <a linkInProse o="#64b687" href="https://github.com/vuejs-translations/docs-zh-cn" target="_blank">Vue</a>、
      <i i-logos-nuxt-icon mr-1 />
      <a linkInProse o="#64d98a" href="https://github.com/nuxt/framework" target="_blank">Nuxt</a> & etc.
      <i i-fluent-emoji-partying-face />
    </p>

    <p>
      I have diverse interests, including watching anime, mountain climbing, music appreciation, foreign language acquisition, gaming,
      and recently, I have embarked on video editing with the goal of becoming a content
      <a linkInProse o="#ed7099" href="https://space.bilibili.com/402454160" target="_blank">Uploader <i i-ri-bilibili-line /></a>.
    </p>

    <div v-if="user" lt-sm-fcc>
      <GC :username="user.login" :month="5" borderable />
    </div>

    <p>
      <a trans text-p-r class="group" hover-op-75 :href="`mailto:${user?.email ?? 'hizyyv@gmail.com'}`">
        Hire Me
        <i trans group-hover="ml-2" i-ri:arrow-right-up-line bg-gradient-to-r />
      </a>
    </p>
  </div>
</template>
