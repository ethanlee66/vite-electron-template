import {app, BrowserWindow } from 'electron'
import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDevelopment = import.meta.env.MODE === 'development'

console.info('[electron] process.env.NODE_ENV', import.meta.env.MODE)

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: join(__dirname, '../preload/electron-preload.cjs')
        }
    })

    win.loadURL(isDevelopment ? 'http://localhost:3000' : `file://${join(__dirname, '../renderer/index.html')}`)

    if (isDevelopment) {
        win.webContents.openDevTools()
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})