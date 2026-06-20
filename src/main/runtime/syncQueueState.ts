import { mapQueueState }
from "./mapQueueState"
import { stateManager } from "./stateManager"

export async function
syncQueueState(){

   const orders =
      await mapQueueState()

   stateManager.setQueue(
      orders
   )
}