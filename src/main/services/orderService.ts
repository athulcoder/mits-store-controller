import { Order, OrderStatus } from "../../types/order";
import { app } from "electron";
import path from "path";
import fs from 'fs/promises'
import { enqueueOrder } from "./queueService";
import { apiFetch } from "./apiServices";

const TEMP_QUEUE_PATH = path.join(app.getPath("userData"), "temp");

export async function fetchOrdersAndPrepare() {

    const orders = await getOrdersFromServer()

    if (!orders.length) return

    for (const order of orders) {

        try {

            console.log("Preparing Order:", order.id)

            const orderFolderPath = path.join(
                TEMP_QUEUE_PATH,
                order.id
            )

            await fs.mkdir(orderFolderPath, {
                recursive: true
            })

            // Save meta.json
            const metaPath = path.join(
                orderFolderPath,
                "meta.json"
            )

            await fs.writeFile(
                metaPath,
                JSON.stringify(order, null, 2)
            )

            // Download prints
            for (const print of order.prints) {

                await downloadFile(
                    print.fileUrl,
                    orderFolderPath,
                    print.id
                )
            }

            // Mark READY ( to avoid the print worker to take and order that is not fully downloaded)
            const readyPath = path.join(
                orderFolderPath,
                "READY"
            )

            await fs.writeFile(readyPath, "")

            console.log(`Order ${order.id} ready for printing`)
            
            //Enqueue into the queue
            await enqueueOrder(order.id)
            console.log(`Order ${order.id} pushed to queue.json`)


        } catch (err) {

            console.error(
                `Failed preparing order ${order.id}`,
                err
            )
        }
    }
}



// THIS FUNCTION DOWNLAODS THE FILE AND STORE IN THE ORDER FOLDER

async function downloadFile(
    url: string,
    orderFolderPath: string,
    printId: string
): Promise<string> {

    const filePath = path.join(
        orderFolderPath,
        `${printId}.pdf`
    )

    // Skip existing file
    try {

        await fs.access(filePath)

        console.log(`${printId}.pdf already exists`)

        return filePath

    } catch {
        // file doesn't exist
    }

    console.log(`Downloading ${printId}.pdf`)

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Failed to download file")
    }

    const arrayBuffer =
        await response.arrayBuffer()

    const buffer = Buffer.from(arrayBuffer)

    await fs.writeFile(filePath, buffer)

    console.log(`${printId}.pdf downloaded`)

    return filePath
}








// this fill fetch the orders from the server
async function getOrdersFromServer(): Promise<Order[]>{
    const res = await fetch(`http://localhost:3000/api/file?SECRET_KEY=mitsprint123456789`);

    const result = await res.json()

    console.log(result)

    return result.data;
}





export async function updateOrderStatus(orderId:string , orderStatus:OrderStatus){
    
    console.log("HELLOE EHEHEHEHHE")

    console.log(orderId, orderStatus ,"HEH----------")
    const res = await apiFetch('/api/file/update',{orderId, orderStatus});

    const data = await res.json()
    console.log(data);

    
}