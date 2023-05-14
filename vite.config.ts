/// <reference types="vitest" />
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({
    insertTypesEntry: true,
    cleanVueFileName: true,
    outputDir: 'lib',
    staticImport: true,
    exclude: ['**/__tests__/**/*', '**/__mocks__/**/*'],
  }), vueJsx()],

  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
  
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vue-lazy-load-image-component',
      fileName: 'index',
      formats: ['es'],
    },

    rollupOptions: {
      input: ['src/index.ts', 'src/effects/index.css'],
      external: ['vue'],
      output: {
        dir: 'lib',
        globals: {
          vue: 'Vue'
        },
        format: 'es'
      }
    }
  },
})
