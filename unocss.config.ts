import { UnocssPluginOptions } from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

import carbon from '@iconify-json/carbon'

// console.log(carbon)
// import('./src/a').then((i) => console.log(i))

// import('@iconify-json/carbon/icons.json').then((i) => console.log(i))

export default (): UnocssPluginOptions => ({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      collections: {
        carbon: () => Promise.resolve(carbon.icons)
        // carbon: () =>
        //   import('@iconify-json/carbon/icons.json').then(
        //     (i) => i.default as any
        //   )
        // mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default as any),
        // logos: () => import('@iconify-json/logos/icons.json').then(i => i.default as any),
        // twemoji: () => import('@iconify-json/twemoji/icons.json').then(i => i.default as any),
        // ri: () => import('@iconify-json/ri/icons.json').then(i => i.default as any),
        // tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default as any),
        // uim: () => import('@iconify-json/uim/icons.json').then(i => i.default as any),
      },
      scale: 2
    })
  ],
  rules: [
    [/^z-(\d+)$/, ([, d]) => ({ 'z-index': d })],
    [
      'p-c',
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`
      }
    ],
    [
      'f-c',
      {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }
    ]
  ]
})
