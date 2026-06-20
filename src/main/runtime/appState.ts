export enum AppMode {
    AUTO = "AUTO",
    MANUAL = "MANUAL"
}

export interface Worker1State {
    running: boolean
    lastSyncAt: string | null
}

export interface Worker2State {
  running: boolean;
  currentOrderId: string | null;
  currentOrder: OrderCardDto | null;
}

export interface OrderCardDto {

    id: string

    userName: string

    batch: string | null

    department: string | null

    image: string | null

    paymentStatus: string

    paymentAmount: number

    printCount: number

    createdAt: string
}

export interface QueueState {

    totalOrders: number

    orders: OrderCardDto[]
}

export interface AppState {

    mode: AppMode

    worker1: Worker1State

    worker2: Worker2State

    queue: QueueState
}