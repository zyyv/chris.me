<template>
  <header class="w-full">
    <router-link to="/">
      <img class="w-10 h-10 fixed left-6 top-6" src="@/assets/logo.svg" alt="logo" />
    </router-link>
    <nav class="nav">
      <div class="spacer"></div>
      <div class="right">
        <router-link to="/posts">
          <div w-6 h-6 class="i-ri:article-line"></div>
        </router-link>
        <router-link to="/projects">
          <div w-6 h-6 class="i-carbon:progress-bar-round"></div>
        </router-link>
        <router-link to="/photoes">
          <div w-6 h-6 class="i-carbon:camera-action"></div>
        </router-link>
        <a href="/chat" target="_blank">
          <div w-6 h-6 class="i-carbon:chat-operational"></div>
        </a>
        <a href="https://space.bilibili.com/402454160" target="_blank">
          <div w-6 h-6 class="i-ri:bilibili-line"></div>
        </a>
        <a href="https://github.com/chris-zhu" target="_blank">
          <div w-6 h-6 class="i-carbon:logo-github"></div>
        </a>
        <div>
          <div w-6 h-6 class="i-carbon:language"></div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
  a {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0.6;
    outline: none;

    &:hover {
      opacity: 1;
      text-decoration-color: inherit;
    }
  }
  .right {
    display: grid;
    grid-gap: 1.2rem;
    grid-auto-flow: column;
  }
}
</style>
