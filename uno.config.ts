import {
  type CSSObject,
  type Shortcut,
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

const usefulShortcuts: Shortcut[] = [
  ['pr', 'relative'],
  ['pa', 'absolute'],
  ['pf', 'fixed'],
  ['ps', 'sticky'],
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

const typographyCssExtend: Record<string, CSSObject> = {
  'a': {
    'text-decoration-color': 'rgba(192, 132, 252, 0.3);',
    'text-underline-offset': '4px',
    'transition': 'all 0.3s ease-in-out',
  },
  'a:hover': {
    'text-decoration-color': 'rgba(192, 132, 252, 0.9);',
  },
  'pre': {
    background: '#23272d !important',
  },
  'blockquote': {
    'border-left': '0.25em solid rgba(168,85,247,.4)',
  },
}

export default defineConfig({
  shortcuts: [
    ...usefulShortcuts,

    ['trans', 'transition-all-350 ease-linear'],
    ['text', 'text-$text'],
    ['bg', 'bg-$bg'],
    // ['u-prose', 'prose prose-reading'],

    ['linear-text', 'text-transparent bg-clip-text bg-gradient-to-r'],
    ['text-p-r', 'linear-text from-purple to-red'],

    ['icon', 'w-5.5 h-5.5 cursor-pointer select-none transition-opacity-300 ease-in-out text'],
    ['icon-btn', 'icon color-inherit op64 hover-op100 hover-color-teal-500 dark-hover-color-inherit'],
    ['icon-link', 'icon color-inherit op64 hover:op100 hover-text-red-300 dark-hover-color-inherit'],
    ['icon-text', 'color-inherit op64 hover:op100 hover-text-purple dark-hover-color-inherit'],
    ['link-hoverImportant', '!no-underline !hover-underline !hover-underline-offset-4 trans'],
    ['link', '!text-red-400 link-hoverImportant'],
    ['linkOutside', '!text-teal-500 link-hoverImportant'],
    ['linkOrg', '!text-blue-400 link-hoverImportant'],
    ['linkBtn', '!text-purple-400 link-hoverImportant'],

    ['header-anchor', 'float-left mt-[0.125em] ml-[-0.8em] pr-[0.2em] text-[0.85em] op-0 group-hover-op-60 fw-600'],

    [/^badge-(.*)$/, ([, c]) => `bg-${c}4:10 text-${c}5 rounded`],
    [/^badge-xs-(.*)$/, ([, c]) => `badge-${c} text-xs px2 py0.5`],
    [/^badge-sm-(.*)$/, ([, c]) => `badge-${c} text-sm px3 py0.6`],
    [/^badge-lg-(.*)$/, ([, c]) => `badge-${c} px3 py0.8`],
    [/^badge-square-(.*)$/, ([, c]) => `badge-${c} w-7 h-7 text-lg font-200 flex flex-none items-center justify-center`],
  ],
  theme: {
    fontFamily: {
      // mono: 'dm,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    colors: {
      // reading: {
      //   50: '#f9f9f9',
      //   100: '#f2f2f2',
      //   200: '#e0e0e0',
      //   300: '#c7c7c7',
      //   400: '#a8a8a8',
      //   500: '#888888',
      //   600: '#5f5f5f',
      //   700: '#3c3c3c',
      //   800: '#262626',
      //   900: '#171717',
      //   950: '#000000',
      // }
    },
  },
  configDeps: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetTypography({ cssExtend: typographyCssExtend }),
    presetUseful(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
  safelist: 'sm-fsc max-w-75'.split(' '),
})
