import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createMainWinwdow } from './windows/mainWindow'
import { startQueue } from './services/dump/queue.service'
import { initializeQueue } from './services/queueService'
import { startFetchWorker } from './services/fetchWorker'
import { startPrintWorker } from './services/printWorker'


  
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC for the communication for the printer and api for communication with server

  // Start print queue system


     //QUEUE is created if no exists queue.json
      await initializeQueue()


      //WORKER 1 (fetch the orders and add to the local queue)
      startFetchWorker().catch(err => {
              console.error(
                  "Fetch Worker Error:",
                  err
              )
          })


    //WORKER 2 (take the first order from queue and give to the printer)
    startPrintWorker().catch(err => {
        console.error(
            "Print Worker Error:",
            err
        )
    })

    createMainWinwdow()



  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWinwdow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
