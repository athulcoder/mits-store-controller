// This is the Service that prints the print taking it from the queue

// logic for that leaves here

import os from "os"
import fs from "fs"
import { exec } from "child_process"
import { print } from "pdf-to-printer"

import type { PrintFile } from "../../../types/order"

export async function printFile(
  filePath: string,
  printFile: PrintFile,
  printerName?: string
): Promise<void> {

  // validate file
  if (!fs.existsSync(filePath)) {
    throw new Error("Print file does not exist")
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