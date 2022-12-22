<template>
  <NuxtLoadingIndicator :height="1" color="repeating-linear-gradient(to right,rgba(192,132,252,1) 0%,rgba(248,113,113,1) 50%,rgba(45,212,191,1) 100%)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'Chris Zhu',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/logo-light.svg' },
  ],
  meta: [
    { hid: 'description', name: 'description', content: 'Chris blog is a place to share my thoughts and learn new things.' },
    { hid: 'keywords', name: 'keywords', content: 'chris, blog, thoughts, learn, new, things' },
    { 'http-equiv': 'pragma', 'content': 'no-cache' },
    { 'http-equiv': 'cache-control', 'content': 'no-cache' },
    { 'http-equiv': 'expires', 'content': '0' },
  ],
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
})
</script>
