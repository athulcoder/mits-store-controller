import {
    AppMode,
    AppState
} from "./appState"

import { eventBus } from "./eventBus"
import { EVENTS } from "./events"

class StateManager {

    private state: AppState = {

        mode: AppMode.AUTO,

        worker1: {
            running: false,
            lastSyncAt: null
        },

        worker2: {
        running: false,
        currentOrderId: null,
        currentOrder: null
        },

        queue: {
            totalOrders: 0,
            orders: []
        }
    }

    getState(): AppState {

        return structuredClone(
            this.state
        )
    }

    setMode(mode: AppMode) {

        this.state.mode = mode

        this.emitUpdate()
    }

    updateWorker1(
        partial:
        Partial<AppState["worker1"]>
    ) {

        this.state.worker1 = {
            ...this.state.worker1,
            ...partial
        }

        this.emitUpdate()
    }

    updateWorker2(
        partial:
        Partial<AppState["worker2"]>
    ) {

        this.state.worker2 = {
            ...this.state.worker2,
            ...partial
        }

        this.emitUpdate()
    }

        setQueue(
        orders: AppState["queue"]["orders"]
        ) {

        this.state.queue = {

            totalOrders: orders.length,

            orders
        }

        this.emitUpdate()
        }
    private emitUpdate() {

        eventBus.emit(
            EVENTS.STATE_UPDATED,
            this.getState()
        )
    }
}

export const stateManager =
    new StateManager()