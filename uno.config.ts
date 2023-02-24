import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'
import { presetUseful } from 'unocss-preset-useful'
import type { Theme } from '@unocss/preset-mini'
import { compressCode } from './utils'

export default defineConfig({
  // shortcuts: [
  //   ['trans', 'transition-all-350 ease-linear'],
  //   ['text', 'text-text-default dark:text-text-dark'],
  //   ['bg', 'trans bg-bg-default dark:bg-bg-dark'],
  //   ['base', 'trans text'],

  //   ['text-main-linear', 'text-gradient-to-tr from-purple-400 to-red-500'],

  //   ['icon', 'w-5.5 h-5.5 cursor-pointer select-none transition-opacity-300 ease-in-out text'],
  //   ['icon-btn', 'icon color-inherit op64 hover-op100 hover-color-teal-500 dark-hover-color-inherit'],
  //   ['icon-link', 'icon color-inherit op64 hover:op100 hover-text-red-300 dark-hover-color-inherit'],
  //   ['icon-text', 'color-inherit op64 hover:op100 hover-text-purple dark-hover-color-inherit'],
  //   ['link-hoverImportant', '!no-underline !hover-underline !hover-underline-offset-4 trans'],
  //   ['link', '!text-red-400 link-hoverImportant'],
  //   ['linkOutside', '!text-teal-500 link-hoverImportant'],
  //   ['linkOrg', '!text-blue-400 link-hoverImportant'],
  //   ['linkBtn', '!text-purple-400 link-hoverImportant'],

  //   ['header-anchor', 'float-left mt-[0.125em] ml-[-0.8em] pr-[0.2em] text-[0.85em] op-0 group-hover-op-60 fw-600'],

  //   [/^badge-(.*)$/, ([, c]) => `bg-${c}4:10 text-${c}5 rounded`],
  //   [/^badge-xs-(.*)$/, ([, c]) => `badge-${c} text-xs px2 py0.5`],
  //   [/^badge-sm-(.*)$/, ([, c]) => `badge-${c} text-sm px3 py0.6`],
  //   [/^badge-lg-(.*)$/, ([, c]) => `badge-${c} px3 py0.8`],
  //   [/^badge-square-(.*)$/, ([, c]) => `badge-${c} w-7 h-7 text-lg font-200 flex flex-none items-center justify-center`],
  // ],
  theme: {
    fontFamily: {
      craft: 'MonoCraft',
    },
    colors: {
      bg: {
        default: '#fefefe',
        dark: '#1c1f24',
      },
      text: {
        default: '#6f6f6f',
        dark: '#C8CCD0',
      },
    },
  } satisfies Theme,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetUseful(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  preflights: [{
    layer: 'font',
    getCSS: () => compressCode(`
      @font-face {
        font-family: 'MonoCraft';
        font-style: normal;
        font-weight: 400;
        src: url('/fonts/MonoCraft.ttf') format('woff');
      }
    `),
  }],
})
