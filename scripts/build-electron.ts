import { exec } from 'node:child_process'

function build() {
  exec('tsx scripts/pre-build.ts', (error, stdout, stderr) => {
    if (error)
      console.error(`[build]: ${error.message}`)

    if (stderr)
      console.error(`[build]: ${stderr}`)
  })
}

build()
