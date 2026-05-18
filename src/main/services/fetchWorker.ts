
/*
THIS IS WORKER 1 ( PRODUCER)
FETCH ORDERS AND DOWNLAOD THE PRINTS INTO temp folder 
*/

import { fetchOrdersAndPrepare } from "./orderService";


export async function startFetchWorker(){

    while (true){

        try{

            await fetchOrdersAndPrepare();

        }
        catch(err){
            console.log("ERROR occured in fetch worker",err);

        }
        await delay(5000) // wait after 5 sec
    }
}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}