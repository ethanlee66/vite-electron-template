import { build } from 'vite'
await build({ configFile: 'packages/electron/main/vite.config.ts' })
await build({ configFile: 'packages/electron/preload/vite.config.ts' })
// await build({ configFile: 'packages/renderer/vite.config.ts' })
