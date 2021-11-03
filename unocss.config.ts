import { UnocssPluginOptions } from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default (): UnocssPluginOptions => ({
  presets: [presetAttributify(), presetUno(), presetIcons()],
  rules: []
})
