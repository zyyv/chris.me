import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

const pathResolve = (src: string) => resolve(__dirname, src)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ script: { refSugar: true } }),
    Unocss(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', 'vue-i18n', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      dts: 'src/components.d.ts'
    }),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [pathResolve('locales/**')]
    })
  ],
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '@a': pathResolve('src/assets'),
      '@c': pathResolve('src/components'),
      '@v': pathResolve('src/views'),
      '@p': pathResolve('src/plugins'),
      '@u': pathResolve('src/use')
    }
  },
  server: {
    fs: {
      strict: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:2430',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core']
  }
})
