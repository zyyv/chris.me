import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const pathResolve = (src: string) => resolve(__dirname, src)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ script: { refSugar: true } }),
    Unocss(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      dts: 'src/components.d.ts'
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
    port: 9999,
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
