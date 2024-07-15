import {app, BrowserWindow } from 'electron'
import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {verbose} from 'sqlite3'

const isPackaged = app.isPackaged

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

    win.loadURL('http://localhost:3000')

    if (!isPackaged) {
        win.webContents.openDevTools()
    }

    useSqlite()
}

function useSqlite() {
    const sqlite3 = verbose()
    let db = new sqlite3.Database(path.resolve(__dirname, 'example.db'), (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to the SQLite database.')
    })

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
    )`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Created users table.');
  });

//   // 关闭数据库
// db.close((err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Closed the database connection.');
//   });
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