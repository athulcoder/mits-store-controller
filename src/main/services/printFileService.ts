

//function returns the Printfile meta from the 
import fs from "fs/promises"
import path from "path"

import { Order } from "../../types/order"

export async function getOrderMetaData(
    orderFolderPath: string,
): Promise<Order> {

    // meta.json path
    const metaPath = path.join(
        orderFolderPath,
        "meta.json"
    )

    // Read meta.json
    const metaContent = await fs.readFile(
        metaPath,
        "utf-8"
    )

    // Parse order
    const order: Order = JSON.parse(
        metaContent
    )

    // Find matching print
    return order
}
