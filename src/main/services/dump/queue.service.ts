import { OrderStatus } from "../../../types/order";
import { downloadFile } from "./download.service";
import { getOrdersFromServer, updateOrderStatus } from "./order.service";
import { printFile } from "./print.service";

export async function startQueue(){
    //run infintely
    while(true){
        const orders = await getOrdersFromServer();

        //for each order iterate
        for(const order of orders){
            try{

                await updateOrderStatus(order.id, OrderStatus.PRINTING)
                
                //for each print in the order 
                for (const print of order.prints){
                    //download file
                    const filePath = await downloadFile(print.fileUrl,print.id)
                    await printFile(filePath, print)
                }
                await updateOrderStatus(order.id, OrderStatus.COMPLETED)
            }
            catch(err){
                console.error(err)
                updateOrderStatus(order.id, OrderStatus.FAILED)
            }
            
        }
        await delay(5000)
    }
}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}