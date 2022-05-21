import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { Shortcut } from 'unocss'

const usefulShortcuts: Shortcut[] = [
  ['pr', 'relative'],
  ['pa', 'absolute'],
  ['pf', 'fixed'],
  ['f-c', 'flex justify-center items-center'],
  ['f-c-c', 'f-c flex-col'],

  ['fc', 'flex justify-center'],
  ['fcc', 'flex justify-center items-center'],
  ['fs', 'flex justify-start'],
  ['fsc', 'flex justify-start items-center'],
  ['fe', 'flex justify-end'],
  ['fec', 'flex justify-end items-center'],
  ['fb', 'flex justify-between'],
  ['fbc', 'flex justify-between items-center'],
  ['fw', 'flex justify-wrap'],
  ['fwr', 'flex justify-wrap-reverse'],
  ['fa', 'flex justify-around'],
  ['fac', 'flex justify-around items-center'],

  ['fic', 'flex items-center'],
  ['fccc', 'flex justify-center items-center flex-col'],

  ['p-c', 'pa top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
]

export default defineConfig({
  shortcuts: [
    ...usefulShortcuts,

    ['trans', 'transition-all-500 ease-in-out'],
    ['text', 'text-text dark:text-text-dark'],
    ['bg', 'bg-bg dark:bg-bg-dark'],
    ['base', 'trans text'],

    ['icon', 'w-5.5 h-5.5 cursor-pointer select-none transition-opacity-300 ease-in-out text'],
    ['icon-btn', 'icon text-inherit op64 hover-op100'],
    ['icon-link', 'icon op64 hover:op100'],
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
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
