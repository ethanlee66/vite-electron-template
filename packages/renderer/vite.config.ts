import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const PACKAGE_ROOT = __dirname

// https://vitejs.dev/config/
export default defineConfig({
  root: PACKAGE_ROOT,
  plugins: [vue()],
  base: './',
  build: {
    outDir: resolve(PACKAGE_ROOT, '../../dist/renderer'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
})
