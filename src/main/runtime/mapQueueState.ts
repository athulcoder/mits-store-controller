import fs from "fs/promises";
import path from "path";
import { app } from "electron";

import { getQueue }
from "../services/queueService";
import { OrderCardDto } from "./appState";

const TEMP_QUEUE_PATH = path.join(
  app.getPath("userData"),
  "temp"
);

export async function mapQueueState() {

  const queue =
    await getQueue();

  const orders:OrderCardDto[] = [];

  for (const orderId of queue) {

    try {

      const metaPath = path.join(
        TEMP_QUEUE_PATH,
        orderId,
        "meta.json"
      );

      const metaContent =
        await fs.readFile(
          metaPath,
          "utf8"
        );

      const order =
        JSON.parse(metaContent);

      orders.push({

        id: order.id,

        userName:
          order.user?.name ??
          "Unknown",

        batch:
          order.user?.batch ??
          null,

        department:
          order.user?.department ??
          null,
        paymentAmount:
            order.payment?.amount ?? 0,
        image:
          order.user?.image ??
          null,

        paymentStatus:
          order.paymentStatus,

        printCount:
          order.prints?.length ?? 0,

        createdAt:
          order.createdAt
      });

    } catch {

      continue;
    }
  }

  return orders;
}