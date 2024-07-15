import { defineConfig } from 'vite'
import { builtinModules } from 'module';
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        nodePolyfills()
      ],
  build: {
    lib: {
        entry: resolve(__dirname, './main.ts'),
        name: 'electron-main', 
        formats: ['cjs'],
        fileName: () => `electron-main.cjs`
    },
    rollupOptions: {
        output: {
           dir: resolve('dist/main')
        },
        external: ['electron', 'sqlite3', ...builtinModules],
    }
  },
  server: {
    port: 3000
  }
})
