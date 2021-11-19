import { presetUno, presetAttributify, presetIcons, defineConfig } from 'unocss'

export const createConfig = ({ strict = true, dev = true } = {}) => {
  return defineConfig({
    envMode: dev ? 'dev' : 'build',
    theme: {
      fontFamily: {
        sans: '\'Inter\', sans-serif',
        mono: '\'Fira Code\', monospace'
      }
    },
    presets: [
      presetAttributify({ strict }),
      presetUno(),
      presetIcons({
        collections: {
          carbon: () => import('@iconify-json/carbon').then(i => i.icons as any),
          ri: () => import('@iconify-json/ri').then(i => i.icons as any)
          // mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default as any),
          // logos: () => import('@iconify-json/logos/icons.json').then(i => i.default as any),
          // twemoji: () => import('@iconify-json/twemoji/icons.json').then(i => i.default as any),
          // ri: () => import('@iconify-json/ri/icons.json').then(i => i.default as any),
          // tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default as any),
          // uim: () => import('@iconify-json/uim/icons.json').then(i => i.default as any),
        }
      })
    ],
    rules: [
      ['p-c', { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
      ['f-c', { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' }]
    ]
  })
}

export default createConfig()
