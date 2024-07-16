import { build } from 'vite'

const isProduction = process.env.MODE === 'production'

await build({ configFile: 'packages/electron/main/vite.config.ts', mode: process.env.MODE })
await build({ configFile: 'packages/electron/preload/vite.config.ts', mode: process.env.MODE })
isProduction && await build({ configFile: 'packages/renderer/vite.config.ts', mode: process.env.MODE })
