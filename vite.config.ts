import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Unocss from 'unocss/vite'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'

const pathResolve = (src: string) => resolve(__dirname, src)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ script: { refSugar: true } }), WindiCSS()],
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
    port: 9999,
    proxy: {
      '/api': {
        target: 'http://localhost:2430',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: ['naive-ui', '@vueuse/core']
  }
})
