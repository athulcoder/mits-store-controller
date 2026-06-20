export interface OrderCardDto {
  id: string;

  userName: string;

  batch: string | null;

  department: string | null;

  image: string | null;

  paymentStatus: string;

  paymentAmount:number;

  printCount: number;

  createdAt: string;
}

export interface AppState {
  mode: "AUTO" | "MANUAL";

  worker1: {
    running: boolean;
    lastSyncAt: string | null;
  };

  worker2: {
    running: boolean;
    currentOrderId: string | null;
    currentOrder:OrderCardDto;
  };

  queue: {
    totalOrders: number;
    orders: OrderCardDto[];
  };
}