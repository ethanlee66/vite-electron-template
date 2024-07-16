import { exec } from 'child_process'

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

await preBuild()







