<template>
  <header w-full>
    <router-link to="/">
      <img w-10 h-10 fixed left-6 top-6 src="@/assets/logo.svg" alt="logo" />
    </router-link>
    <nav p-8 w-full grid box-border class="grid-cols-[auto,max-content]">
      <div class="spacer"></div>
      <div grid gap-5 auto-flow-col>
        <Navlink
          v-for="route in routes"
          :key="route.to"
          :to="route.to"
          text-inherit
          no-underline
          outline-none
          hover="op-100"
          transition-opacity-300
          activeClass="op-100"
          inactiveClass="op-50"
        >
          <div w-6 h-6 :class="route.icon"></div>
        </Navlink>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const routes = reactive([
  {
    icon: 'i-ri:article-line',
    to: '/posts'
  },
  {
    icon: 'i-carbon:progress-bar-round',
    to: '/projects'
  },
  {
    icon: 'i-carbon:camera-action',
    to: '/photoes'
  },
  {
    icon: 'i-carbon:chat-operational',
    to: 'https://space.bilibili.com/402454160'
  },
  {
    icon: 'i-ri:bilibili-line',
    to: 'https://space.bilibili.com/402454160'
  },
  {
    icon: 'i-carbon:logo-github',
    to: 'https://github.com/chris-zhu'
  },
  {
    icon: 'i-carbon:language',
    to: '/'
  }
])
</script>
