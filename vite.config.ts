import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (src: string) => resolve(__dirname, src)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '@c': pathResolve('src/components'),
      '@v': pathResolve('src/views')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:2430',
        changeOrigin: true
      }
    }
  }
})
