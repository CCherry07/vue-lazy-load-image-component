import { defineConfig } from 'vite'
// @ts-ignore
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vue-lazy-load-image-component',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
