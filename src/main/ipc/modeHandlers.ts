import { ipcMain } from "electron"

import {
    AppMode
} from "../runtime/appState"

import {
    stateManager
} from "../runtime/stateManager"

export function registerModeHandlers() {

    ipcMain.handle(
        "mode:set",
        (_, mode: AppMode) => {

            stateManager.setMode(mode)
        }
    )
}