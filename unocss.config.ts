
import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      collections: {
        'logos': () => import('@iconify-json/logos/icons.json').then(i => i.default as any),
        'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
        'akar-icons': () => import('@iconify-json/akar-icons/icons.json').then(i => i.default as any),
        'ri': () => import('@iconify-json/ri').then(i => i.icons as any)
      }
    }),
    presetWebFonts({
      fonts: {
        // these will extend the default theme
        sans: 'Roboto',
        fira: ['Fira Code', 'Fira Mono:400,700'],
        // custom ones
        lobster: 'Lobster',
        lato: [
          {
            name: 'Lato',
            weights: ['400', '700'],
            italic: true
          },
          {
            name: 'sans-serif',
            provider: 'none'
          }
        ]
      }
    })
  ],
  // theme: {
  //   animation: {
  //     keyframes: {}
  //   }
  // },
  layers: {
    default: 1,
    modele: 2
  },
  rules: [
    ['pr', { position: 'relative' }, { layer: 'modele' }],
    ['pa', { position: 'absolute' }, { layer: 'modele' }]
  ],
  shortcuts: [
    ['f-c', 'flex justify-center items-center'],
    ['f-c-c', 'f-c flex-col'],
    ['p-c', 'pa top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
    ['toDark', 'transition-all-500 ease-in-out'],
    ['base', 'toDark text-$text-black dark:text-$text-black-dark'],
    ['icon', 'w-6 h-6 cursor-pointer select-none transition-opacity-300 ease-in-out dark:text-[#afbac6] dark:hover:text-[#d9dfe9]'],
    ['icon-btn', 'icon text-inherit'],
    ['icon-link', 'icon text-gray-700 op-50 hover:op-100'],
    ['menu-icon-line', 'transition pa block bg-gray-700 op-50 dark:bg-[#afbac6] w-5/7 h-2px'],
    ['clearBtn', 'bg-transparent border-none outline-none']
  ]
})
