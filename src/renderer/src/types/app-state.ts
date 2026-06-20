export interface AppState {

  mode: "AUTO" | "MANUAL";

  worker1: {
    running: boolean;
    lastSyncAt: string | null;
  };

  worker2: {
    running: boolean;
    currentOrderId: string | null;
  };

  queue: {
    totalOrders: number;
    orderIds: string[];
  };
}