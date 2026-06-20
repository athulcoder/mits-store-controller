export enum AppMode {
    AUTO = "AUTO",
    MANUAL = "MANUAL"
}

export interface Worker1State {
    running: boolean
    lastSyncAt: string | null
}

export interface Worker2State {
    running: boolean
    currentOrderId: string | null
}

export interface QueueState {
    totalOrders: number
    orderIds: string[]
}

export interface AppState {

    mode: AppMode

    worker1: Worker1State

    worker2: Worker2State

    queue: QueueState
}