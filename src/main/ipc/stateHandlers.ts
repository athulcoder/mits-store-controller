import { BrowserWindow, ipcMain } from "electron"
import { stateManager } from "../runtime/stateManager"
import { eventBus } from "../runtime/eventBus"

export function registerStateHandlers() {

    ipcMain.handle(
        "state:get",
        () => {

            return stateManager.getState()
        }
    )
}

export function registerStateEvents() {

    eventBus.on(
        "state-updated",
        state => {

            BrowserWindow
                .getAllWindows()
                .forEach(window => {

                    window.webContents.send(
                        "state:updated",
                        state
                    )
                })
        }
    )
}