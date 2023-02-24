// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    // '@nuxt/devtools',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  // devtools: {
  //   // Enable devtools (default: true)
  //   enabled: true,
  //   // VS Code Server options
  //   vscode: {},
  //   // ...other options
  // },
})
