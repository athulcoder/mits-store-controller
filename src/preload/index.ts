import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {

    getState: () => {

        return ipcRenderer.invoke(
            "state:get"
        )
    },

    setMode: (mode:string) => {

        return ipcRenderer.invoke(
            "mode:set",
            mode
        )
    },

    onStateUpdated: (
        callback:
        (state:any)=>void
    ) => {

        ipcRenderer.on(
            "state:updated",
            (_, state) => {

                callback(state)
            }
        )
    }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
