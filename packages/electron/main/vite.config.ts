import { builtinModules } from 'node:module'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './main.ts'),
      name: 'electron-main',
      formats: ['cjs'],
      fileName: () => 'electron-main.cjs',
    },
    rollupOptions: {
      output: {
        dir: resolve('dist/main'),
      },
      external: [
        'electron',
        ...builtinModules,
        ...builtinModules.map(module => `node:${module}`),
      ],
    },
  },
  server: {
    port: 3000,
  },
})
