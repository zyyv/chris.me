import {
  type CSSObject,
  type RuleContext,
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
import { parseColor } from '@unocss/preset-mini/utils'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

const typographyCssExtend: Record<string, CSSObject> = {
  'a': {
    'display': 'inline-block',
    'line-height': '1.5',
    'border-bottom': '1px dashed rgba(var(--c-context), 0.5)',
    'text-decoration': 'none',
    'transition': 'all 0.3s ease-in-out',
  },
  'a:hover': {
    'border-bottom': '1px solid rgba(var(--c-context), 1)',
  },
  'pre': {
    'background': '#eee !important',
    'font-family': 'dm',
  },
  '.dark pre': {
    background: '#222 !important',
  },
  'blockquote': {
    'border-left': '0.1em solid rgba(168,85,247,.4)',
  },
}

export default defineConfig({
  rules: [
    [/^o-(.*)$/, ([, body]: string[], { theme }: RuleContext<{}>) => {
      const color = parseColor(body, theme)
      if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
        return {
          '--c-context': `${color.cssColor.components.join(',')}`,
        }
      }
      else {
        return {
          '--c-context': color?.color,
        }
      }
    }],
  ],
  shortcuts: [
    ['trans', 'transition-all-350 ease-linear'],
    ['text', 'text-primary-text'],
    ['bg', 'bg-primary-bg'],
    // ['u-prose', 'prose prose-reading'],

    ['linear-text', 'text-transparent bg-clip-text bg-gradient-to-r'],
    ['text-p-r', 'linear-text from-purple to-red'], // test case

    ['icon', 'w-5.5 h-5.5 cursor-pointer select-none transition-opacity-300 ease-in-out text'],
    ['icon-btn', 'icon color-inherit op64 hover-op100 hover-color-teal-500 dark-hover-color-inherit'],
    ['icon-link', 'icon color-inherit op64 hover:op100 hover-text-red-300 dark-hover-color-inherit'],
    ['icon-text', 'color-inherit op64 hover:op100 hover-text-purple dark-hover-color-inherit'],
    ['linkInProse', 'trans c-context'],

    ['header-anchor', 'float-left mt-[0.125em] ml-[-0.8em] pr-[0.2em] text-[0.85em] op-0 group-hover-op-60 fw-600'],

    [/^badge-(.*)$/, ([, c]) => `bg-${c}4:10 text-${c}5 rounded`],
    [/^badge-xs-(.*)$/, ([, c]) => `badge-${c} text-xs px2 py0.5`],
    [/^badge-sm-(.*)$/, ([, c]) => `badge-${c} text-sm px3 py0.6`],
    [/^badge-lg-(.*)$/, ([, c]) => `badge-${c} px3 py0.8`],
    [/^badge-square-(.*)$/, ([, c]) => `badge-${c} w-7 h-7 text-lg font-200 flex flex-none items-center justify-center`],
  ],
  theme: {
    fontFamily: {
      dm: 'dm',
      craft: 'MonoCraft',
    },
    colors: {
      context: 'rgba(var(--c-context),%alpha)',
      primary: {
        DEFAULT: 'rgba(var(--text),%alpha)',
        text: 'rgba(var(--text),%alpha)',
        bg: 'rgba(var(--bg),%alpha)',
      },
    },
  },
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
      collections: {
        'my-logos': FileSystemIconLoader('./public/logos'),
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
