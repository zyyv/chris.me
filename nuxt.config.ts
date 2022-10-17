export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    // '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    // '@intlify/nuxt3',
  ],
  unocss: {
    preflight: true,
  },
  content: {
    highlight: {
      theme: 'vitesse-dark',
    },
    documentDriven: true,
  },

  // intlify: {
  //   localeDir: 'locales',
  //   vueI18n: {
  //     locale: 'zh-cn',
  //   },
  // },
  experimental: {
    // viteNode: true,
  },
})
