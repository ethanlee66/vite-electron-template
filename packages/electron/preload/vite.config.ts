import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
        entry: resolve(__dirname, './index.ts'),
        name: 'electron-preload', 
        formats: ['cjs'],
        fileName: () => `electron-preload.cjs`
    },
    rollupOptions: {
        output: {
           dir: resolve('dist/preload')
        },
        external: ['electron'],
    }
  },
  server: {
    port: 3000
  }
})
