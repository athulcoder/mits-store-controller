/*
THIS IS WORKER 2 ( CONSUMER)
TAKES THE FIRST ORDER FROM QUEUE.JSON and put that into the printer queue
*/

import { exec } from "child_process"
import { print } from "pdf-to-printer"
import os from "os"
import fs from "fs/promises"


import { peekQueue } from "../services/queueService"
import { stateManager } from "../runtime/stateManager"
import { processOrder } from "./orderProcessor"
import { PrintFile } from "../../types/order"
import { AppMode } from "../runtime/appState"



export async function startPrintWorker() {

stateManager.updateWorker2({
running: true
});

while (true) {

try {

  const mode =
    stateManager
      .getState()
      .mode;

  if (
    mode === AppMode.MANUAL
  ) {

    await delay(1000);

    continue;
  }

  const orderId =
    await peekQueue();

  if (!orderId) {

    await delay(2000);

    continue;
  }

  await processOrder(
    orderId
  );

} catch (err) {

  console.error(
    "Print Worker Error:",
    err
  );
}

await delay(1000);

}
}

function delay(ms: number) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    )
}


 export async function addFileToPrinterQueue(
  filePath: string,
  printFile:PrintFile,
  printerName?: string
): Promise<void> {

  // validate file
    try {

    await fs.access(filePath)

    } catch {

    throw new Error(
        "Print file does not exist"
    )
    }

  const platform = os.platform()

  console.log("Printing started")
  console.log("Platform:", platform)
  console.log("File:", filePath)
  console.log("Printer:", printerName)

  // WINDOWS
  if (platform === "win32") {

    await print(filePath, {
      printer: printerName,

      copies: printFile.copies,

      orientation:
        printFile.orientation === "LANDSCAPE"
          ? "landscape"
          : "portrait",

      monochrome:
        printFile.colorMode === "BLACK_WHITE",

      side:
        printFile.printOnBothSides
          ? "duplexlong"
          : "simplex",

      pages:
        printFile.pageRange === "CUSTOM"
          ? printFile.customRange || undefined
          : undefined,

      silent: true
    })

    console.log("Windows print success")

    return
  }

  // MACOS + LINUX
  if (
    platform === "darwin" ||
    platform === "linux"
  ) {

    const commands: string[] = []

    commands.push("lp")

    // printer
    if (printerName) {
      commands.push(`-d "${printerName}"`)
    }

    // copies
    commands.push(`-n ${printFile.copies}`)

    // orientation
    if (printFile.orientation === "LANDSCAPE") {
      commands.push(`-o landscape`)
    }

    // black & white
    if (printFile.colorMode === "BLACK_WHITE") {
      commands.push(`-o ColorModel=Gray`)
    }

    // duplex
    if (printFile.printOnBothSides) {
      commands.push(`-o sides=two-sided-long-edge`)
    }

    // custom range
    if (
      printFile.pageRange === "CUSTOM" &&
      printFile.customRange
    ) {
      commands.push(`-P ${printFile.customRange}`)
    }

    commands.push(`"${filePath}"`)

    const command = commands.join(" ")

    console.log("Executing:", command)

    return new Promise((resolve, reject) => {

      exec(command, (error, stdout, stderr) => {

        if (error) {

          console.error(stderr)

          reject(error)

          return
        }

        console.log(stdout)
        console.log("Mac/Linux print success")

        resolve()
      })

    })

  }

  throw new Error(
    `Unsupported platform: ${platform}`
  )
}