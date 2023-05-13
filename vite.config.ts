import { defineConfig } from 'vite'
// @ts-ignore
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx()],
})
