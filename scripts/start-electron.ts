import { exec } from 'node:child_process'
import waitOn from 'wait-on'

function preBuild() {
  return new Promise<void>((resolve, reject) => {
    console.info('Running pre-build script...')
    exec('tsx --trace-warnings scripts/pre-build.ts', (error, stdout, stderr) => {
      if (error)
        reject(new Error(`[pre-build]: ${error.message}`))

      if (stderr)
        console.info(`[pre-build]: ${stderr}`)

      console.info(`[pre-build]: ${stdout}`)
      resolve()
    })
  })
}

function runViteProcess() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    console.info('Starting Vite server...')
    const viteProcess = exec('pnpm run dev')

    // if (viteProcess.stdout && viteProcess.stderr) {
    viteProcess.stdout!.on('data', (data) => {
      console.info(`[vite]: ${data}`)
    })

    viteProcess.stderr!.on('data', (data) => {
      console.error(`[vite]: ${data}`)
    })

    await waitOn({
      resources: ['http://localhost:3000'],
      delay: 1000,
      timeout: 30000,
    },
    (err) => {
      if (err)
        console.error('Vite server did not start in time:', err)

      resolve(viteProcess)
    })

    // }
  })
}

function runElectronProcess(viteProcess) {
  console.info('Starting Electron...')
  const electronProcess = exec('electron .')

  if (electronProcess.stdout && electronProcess.stderr) {
    electronProcess.stdout.on('data', (data) => {
      console.info(`[electron]: ${data}`)
    })

    electronProcess.stderr.on('data', (data) => {
      console.error(`[electron]: ${data}`)
    })

    electronProcess.on('close', (code) => {
      console.info(`[electron]: exited with code ${code}`)
      viteProcess.kill()
      process.exit(code)
    })
  }
}

preBuild().then(runViteProcess).then(runElectronProcess).catch((error) => {
  console.error('Error starting electron:', error)
})
