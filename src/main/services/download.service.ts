    import fs from "fs"
    import path from "path"
    import os from "os"

    export async function downloadFile(url: string,printId:string): Promise<string> {
    // fetch file
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Failed to download file")
    }

    // convert response to buffer
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // filename
    const fileName = printId+".pdf"

    // save location
    const filePath = path.join(os.tmpdir(), fileName)

    // write file
    fs.writeFileSync(filePath, buffer)

    // return saved path
    return filePath
    }