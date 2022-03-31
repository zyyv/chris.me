import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'vite-plugin-md'
import ViteImages from 'vite-plugin-vue-images'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Image from 'unplugin-vue-image/vite'

const r = (src: string) => resolve(__dirname, src)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({ script: { refSugar: true }, include: [/\.vue$/, /\.md$/] }),
    Unocss(),
    Pages({ extensions: ['vue', 'md'] }),
    Layouts(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', 'vue-i18n', '@vueuse/core', { axios: [['default', 'axios']] }],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts'
    }),
    Image({
      dirs: 'src/assets/imgs',
      dts: 'src/auto-import-image.d.ts'
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [r('locales/**')]
    }),
    Markdown(),
    ViteImages(),
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': r('src'),
      '@a': r('src/assets'),
      '@p': r('src/plugins'),
      '@s': r('src/modules/pinia'),
      '@u': r('src/composables')
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
  },
  base: './'
})
