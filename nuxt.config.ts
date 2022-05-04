import { defineNuxtConfig } from 'nuxt'
import { transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineNuxtConfig({
  meta: {
    title: 'Chris\'s Blog',
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico',
      },
    ],
  },
  buildModules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    // '@intlify/nuxt3',
  ],
  vueuse: {
    ssrHandlers: true,
  },
  unocss: {
    transformers: [transformerDirectives(), transformerVariantGroup()],
    uno: true,
    attributify: true,
    preflight: true,
    typography: true,
    webFonts: true,
    icons: {
      scale: 1.2,
    },
    shortcuts: [
      ['navlink', 'no-underline outline-none text-inherit'],
      ['pr', 'relative'],
      ['pa', 'absolute'],
      ['pf', 'fixed'],
      ['f-c', 'flex justify-center items-center'],
      ['f-c-c', 'f-c flex-col'],
      ['p-c', 'pa top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
      ['trans', 'transition-all-500 ease-in-out'],
      ['base', 'trans text-$text-black dark:text-$text-black-dark'],
      ['icon', 'w-6 h-6 cursor-pointer select-none transition-opacity-300 ease-in-out dark:text-[#afbac6] dark:hover:text-[#d9dfe9]'],
      ['icon-btn', 'icon text-inherit'],
      ['icon-link', 'icon text-gray-700 op-50 hover:op-100'],
      ['menu-icon-line', 'transition pa block bg-gray-700 op-50 dark:bg-[#afbac6] w-5/7 h-2px'],
      ['clearBtn', 'bg-transparent border-none outline-none'],
    ],
    theme: {
      colors: {
        bg: {
          default: '#fefefe',
          dark: '#1c1f24',
        },
        text: {
          default: '#3D4248',
          dark: '#C8CCD0',
        },
        primary: '#00bcd4',
      },
      boxShadow: {
        switch: '0 0 0 2px rgba(24, 160, 88, 0.2)',
      },
    },
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
