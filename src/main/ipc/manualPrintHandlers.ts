import { ipcMain } from "electron";
import { processOrder } from "../services/orderProcessor";

export function registerManualPrintHandlers() {

    ipcMain.handle(
        "manual-print",
        async (_, orderId: string) => {

            await processOrder(orderId);
        }
    );
}