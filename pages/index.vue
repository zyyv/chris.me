<script lang="ts" setup>
useHead({
  title: 'Chris',
})
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div prose ma c-primary text-op-64>
    <!-- <PersonInfo /> -->
    <h1 fsc gap-5>
      <UserAvatar />
    </h1>
    <p>
      I'm <strong c-primary>{{ user?.name }}</strong>, front-end engineer 🧑🏻‍💻 & open source enthusiast.
    </p>
    <p italic>
      「 {{ user?.bio }} 」
    </p>
    <p>
      <i i-fluent-emoji-sparkles mr-1 />
      Team member of
      <IconsUnoCSS />
      ,
      <IconsElk />
      ,
      Creator of
      <IconsOnuUI />
      ,
      <IconsUnPreset />
      <i i-fluent-emoji-sparkles ml-1 />
      <br>
      In the community, I am also a ecological contributors of the
      <IconsVite />
      、
      <IconsVue />
      、
      <IconsNuxt /> & etc.
      <i i-fluent-emoji-partying-face />
    </p>

    <p>
      I have diverse interests, including watching anime, mountain climbing, music appreciation, foreign language acquisition, gaming,
      and recently, I have embarked on video editing with the goal of becoming a content
      <IconsBilibili />
      .
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
