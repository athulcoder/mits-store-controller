import fs from "fs/promises";
import path from "path";
import { app } from "electron";

import { dequeueOrder } from "./queueService";
import { getOrderMetaData } from "./printFileService";
import { OrderStatus } from "../../types/order";
import { updateOrderStatus } from "./orderService";

import { stateManager } from "../runtime/stateManager";
import { EVENTS } from "../runtime/events";
import { eventBus } from "../runtime/eventBus";

import { addFileToPrinterQueue } from "./printWorker";

const TEMP_QUEUE_PATH = path.join(
app.getPath("userData"),
"temp"
);

export async function processOrder(
orderId: string
) {

stateManager.updateWorker2({
currentOrderId: orderId
});

eventBus.emit(
EVENTS.PRINT_STARTED,
orderId
);

console.log(
`Processing Order: ${orderId}`
);

const orderFolderPath = path.join(
TEMP_QUEUE_PATH,
orderId
);

const readyPath = path.join(
orderFolderPath,
"READY"
);

try {

await fs.access(
  readyPath
);


} catch {

console.log(
  `Order ${orderId} not READY`
);

return;


}

const order =
await getOrderMetaData(
orderFolderPath
);

stateManager.updateWorker2({

  currentOrderId: order.id,

  currentOrder: {

    id: order.id,

    userName:
      order.user.name ??
      "Unknown",

    batch:
      order.user?.batch ??
      null,

    department:
      order.user.department ??
      null,
    paymentAmount:order.payment?.amount??0,

    image:
      order.user?.image ??
      null,

    paymentStatus:
      order.paymentStatus,

    printCount:
      order.prints.length,

    createdAt:
      order.createdAt
  }
});

for (const printMeta of order.prints) {

const pdfPath = path.join(
  orderFolderPath,
  `${printMeta.id}.pdf`
);

const queuedPath = path.join(
  orderFolderPath,
  `${printMeta.id}.queued`
);

try {

  await fs.access(
    queuedPath
  );

  console.log(
    `${printMeta.id} already queued`
  );

  continue;

} catch {}

await addFileToPrinterQueue(
  pdfPath,
  printMeta
);

await fs.writeFile(
  queuedPath,
  ""
);

console.log(
  `${printMeta.id} queued successfully`
);

}

console.log(
`Order ${orderId} completed`
);

await updateOrderStatus(
order.id,
OrderStatus.PRINTED
);

await dequeueOrder();

stateManager.updateWorker2({

  currentOrderId: null,

  currentOrder: null
});

eventBus.emit(
EVENTS.PRINT_COMPLETED,
orderId
);

await fs.rm(
orderFolderPath,
{
recursive: true,
force: true
}
);
}
