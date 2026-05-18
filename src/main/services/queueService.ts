import fs from "fs/promises"
import path from "path"
import { app } from "electron"

const TEMP_QUEUE_PATH = path.join(
    app.getPath("userData"),
    "temp"
)

const QUEUE_PATH = path.join(
    TEMP_QUEUE_PATH,
    "queue.json"
)

export async function initializeQueue() {

    // Create temp folder first
    await fs.mkdir(
        TEMP_QUEUE_PATH,
        {
            recursive: true
        }
    )

    try {

        await fs.access(QUEUE_PATH)

        console.log("queue.json exists")

    } catch {

        // Create empty queue
        await fs.writeFile(
            QUEUE_PATH,
            JSON.stringify([], null, 2)
        )

        console.log("queue.json created")
    }
}


//used to get the queue
export async function getQueue(): Promise<string[]> {

    const data = await fs.readFile(
        QUEUE_PATH,
        "utf-8"
    )

    return JSON.parse(data)
}



//used to get the first element in the queue
export async function peekQueue():
Promise<string | null> {

    const queue = await getQueue()

    return queue[0] || null
}


//used to remove the order from teh queue
export async function dequeueOrder() {

    const queue = await getQueue()

    queue.shift()

    await fs.writeFile(
        QUEUE_PATH,
        JSON.stringify(queue, null, 2)
    )
}


//insert the order into the queue(back)
export async function enqueueOrder(
    orderId: string
) {

    const queue = await getQueue()

    // Avoid duplicates
    if (queue.includes(orderId)) {
        return
    }

    queue.push(orderId)

    await fs.writeFile(
        QUEUE_PATH,
        JSON.stringify(queue, null, 2)
    )
}