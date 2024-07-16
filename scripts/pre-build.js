import { build } from 'vite'

console.info(process.env.MODE)
await build({ configFile: 'packages/electron/main/vite.config.ts', mode: process.env.MODE })
await build({ configFile: 'packages/electron/preload/vite.config.ts', mode: process.env.MODE })
await build({ configFile: 'packages/renderer/vite.config.ts', mode: process.env.MODE })
