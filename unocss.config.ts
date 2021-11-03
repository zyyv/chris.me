import { UnocssPluginOptions } from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default (): UnocssPluginOptions => ({
  presets: [presetAttributify(), presetUno(), presetIcons()],
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
