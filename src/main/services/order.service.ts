import { Order, OrderStatus } from "../../types/order";
import { apiFetch } from "./api.service";
// this fill fetch the orders from the server
export async function getOrdersFromServer(): Promise<Order[]>{
    const res = await fetch(`http://localhost:3000/api/file?SECRET_KEY=mitsprint123456789`);

    const result = await res.json()

    console.log(result)

    return result.data;
}


export async function updateOrderStatus(orderId:string , orderStatus:OrderStatus){
    
    const res = await apiFetch('/api/file/update',{orderId, orderStatus});

    const data = res.json()
    console.log(data);

    
}




