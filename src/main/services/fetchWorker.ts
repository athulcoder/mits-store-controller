
/*
THIS IS WORKER 1 ( PRODUCER)
FETCH ORDERS AND DOWNLAOD THE PRINTS INTO temp folder 
*/

import { stateManager } from "../runtime/stateManager";
import { fetchOrdersAndPrepare } from "./orderService";


export async function startFetchWorker(){
       stateManager.updateWorker1({
        running:true
    })

    while (true){

        try{

            await fetchOrdersAndPrepare();

            stateManager.updateWorker1({
                lastSyncAt:
                    new Date().toISOString()
            })

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