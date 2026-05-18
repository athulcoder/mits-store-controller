export type OrderStatus = "pending" | "printing" | "printed" | "failed" | "cancelled";

export interface PrintOrder {
  id: string;
  studentName: string;
  batch: string;
  className: string;
  pages: number;
  fileName: string;
  status: OrderStatus;
  time: string;
  failureReason?: string;
  retries: number;
}

export interface Printer {
  id: string;
  name: string;
  type: "color" | "bw";
  status: "Ready" | "Busy" | "Offline" | "Warning";
}
