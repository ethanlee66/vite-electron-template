import { exec } from 'child_process'
import waitOn from 'wait-on'

function preBuild() {
    return new Promise((resolve, reject) => {
        console.info('Running pre-build script...')
        exec('node scripts/pre-build.js', (error, stdout, stderr) => {
            if (error) {
              console.error(`[pre-build]: ${error.message}`)
              reject()
            }
            if (stderr) {
              console.error(`[pre-build]: ${stderr}`)
              reject()
            }

            console.info(`[pre-build]: ${stdout}`)
            resolve()
            
          });
    })
}

function runViteProcess() {
    return new Promise(async(resolve) => {
        console.info('Starting Vite server...')
        const viteProcess = exec('pnpm run dev');

        viteProcess.stdout.on('data', (data) => {
            console.info(`[vite]: ${data}`)
        })
        
        viteProcess.stderr.on('data', (data) => {
            console.error(`[vite]: ${data}`)
        })

        await waitOn({
            resources: ['http://localhost:3000'],
             delay: 1000,
             timeout: 30000
        },
        err => {
            if (err) {
                console.error('Vite server did not start in time:', err);
            }

            resolve(viteProcess)
         })

       
    })
}

function runElectronProcess(viteProcess) {
    console.info('Starting Electron...')
    const electronProcess = exec('electron .');

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

preBuild().then(runViteProcess).then(runElectronProcess).catch((error) => {
    console.error('Error starting electron:', error)
})





