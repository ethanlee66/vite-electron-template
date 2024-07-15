import { defineConfig } from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

const PACKAGE_ROOT = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  root: PACKAGE_ROOT,
  plugins: [vue()],
  publicDir: resolve(PACKAGE_ROOT, '../../public'),
  build: {
    outDir: resolve('dist/renderer')
  },
  server: {
    port: 3000
  }
})
