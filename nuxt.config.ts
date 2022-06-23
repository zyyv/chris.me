import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  meta: {
    title: 'Chris\' Blog',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    meta: [
      { hid: 'description', name: 'description', content: 'Chirs blog is a place to share my thoughts and learn new things.' },
      { hid: 'keywords', name: 'keywords', content: 'chris, blog, thoughts, learn, new, things' },
      { 'http-equiv': 'pragma', 'content': 'no-cache' },
      { 'http-equiv': 'cache-control', 'content': 'no-cache' },
      { 'http-equiv': 'expires', 'content': '0' },
    ],
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
  },
  buildModules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    // '@pinia/nuxt',
    '@nuxtjs/color-mode',
    // '@intlify/nuxt3',
  ],
  vueuse: {
    ssrHandlers: true,
  },
  unocss: {
    preflight: true,
  },
  // intlify: {
  //   localeDir: 'locales',
  //   vueI18n: {
  //     locale: 'zh-cn',
  //   },
  // },
  // experimental: {
  //   viteNode: true,
  // },
})
