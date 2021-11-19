<script lang="ts" setup>
const { availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <header w-full>
    <router-link to="/">
      <img
        w-10
        h-10
        fixed
        left-6
        top-6
        src="/logo.svg"
        alt="logo"
      />
    </router-link>
    <nav p-8 w-full grid box-border class="grid-cols-[auto,max-content]">
      <div class="spacer"></div>
      <div grid gap-5 auto-flow-col>
        <Navlink
          to="/posts"
          text-inherit
          no-underline
          outline-none
          hover="op-100"
          transition-opacity-300
          active-class="op-100"
          inactive-class="op-50"
        >
          <div w-6 h-6 class="i-ri:article-line"></div>
        </Navlink>
        <Navlink
          to="/projects"
          text-inherit
          no-underline
          outline-none
          hover="op-100"
          transition-opacity-300
          active-class="op-100"
          inactive-class="op-50"
        >
          <div w-6 h-6 class="i-carbon:progress-bar-round"></div>
        </Navlink>
        <Navlink
          to="/photoes"
          text-inherit
          no-underline
          outline-none
          hover="op-100"
          transition-opacity-300
          active-class="op-100"
          inactive-class="op-50"
        >
          <div w-6 h-6 class="i-carbon:camera-action"></div>
        </Navlink>
        <Navlink
          to="https://space.bilibili.com/402454160"
          text-inherit
          no-underline
          outline-none
          hover="op-100"
          transition-opacity-300
          active-class="op-100"
          inactive-class="op-50"
        >
          <div w-6 h-6 class="i-carbon:chat-operational"></div>
        </Navlink>
        <Navlink
          to="https://space.bilibili.com/402454160"
          text-inherit
          no-underline
          outline-none
          hover="op-100"
          transition-opacity-300
          active-class="op-100"
          inactive-class="op-50"
        >
          <div w-6 h-6 class="i-ri:bilibili-line"></div>
        </Navlink>
        <Navlink
          to="https://github.com/chris-zhu"
          text-inherit
          no-underline
          outline-none
          hover="op-100"
          transition-opacity-300
          active-class="op-100"
          inactive-class="op-50"
        >
          <div w-6 h-6 class="i-carbon:logo-github"></div>
        </Navlink>
        <a
          text-inherit
          no-underline
          outline-none
          op-50
          hover="op-100"
          transition-opacity-300
        >
          <div w-6 h-6 class="i-carbon:language" @click="toggleLocales"></div>
        </a>
      </div>
    </nav>
  </header>
</template>
