import { getQueue } from "../services/queueService"
import { stateManager } from "./stateManager"

export async function syncQueueState() {

    const queue = await getQueue()

    stateManager.setQueue(queue)
}