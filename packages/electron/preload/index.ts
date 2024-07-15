import {contextBridge, ipcRenderer} from 'electron'
import {Channel} from './constants'


contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel: Channel, data: unknown) => {
        ipcRenderer.send(channel, data)
    },

    receive: (channel: Channel, func: (...args: unknown[]) => void) => 
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
)