import { create } from 'zustand'
import { PrintOrder, Printer } from '../types/queue'
import { MOCK_ORDERS } from '../data/mockQueue'
import toast from 'react-hot-toast'

interface AppState {
  // Queue Data
  orders: PrintOrder[];
  
  // Modes & Status
  isAutoMode: boolean;
  isPaused: boolean;
  
  // Printers
  selectedColorPrinter: string;
  selectedBwPrinter: string;
  printerStatus: Printer["status"];
  
  // Current Printing Job
  currentJobId: string | null;
  pagesPrinted: number;
  
  // Actions
  setMode: (isAuto: boolean) => void;
  setPaused: (isPaused: boolean) => void;
  setPrinter: (type: "color" | "bw", name: string) => void;
  
  // Queue Actions
  cancelOrder: (id: string) => void;
  retryOrder: (id: string) => void;
  clearCompleted: () => void;
  
  // Internal Simulation Actions
  startPrinting: (id: string) => void;
  updatePrintProgress: (pages: number) => void;
  completePrintJob: (id: string) => void;
  failPrintJob: (id: string, reason: string) => void;
}

export const useStore = create<AppState>((set) => ({
  orders: MOCK_ORDERS,
  
  isAutoMode: true,
  isPaused: false,
  
  selectedColorPrinter: "HP Color LaserJet Pro",
  selectedBwPrinter: "HP LaserJet Pro M404n",
  printerStatus: "Ready",
  
  currentJobId: null,
  pagesPrinted: 0,
  
  setMode: (isAuto) => {
    set({ isAutoMode: isAuto });
    toast(isAuto ? "Automatic Mode Enabled" : "Manual Mode Enabled", {
      icon: isAuto ? "🟢" : "🟡",
    });
  },
  
  setPaused: (isPaused) => {
    set({ isPaused });
    if (isPaused) toast.error("Queue Paused");
    else toast.success("Queue Resumed");
  },
  
  setPrinter: (type, name) => {
    if (type === "color") set({ selectedColorPrinter: name });
    else set({ selectedBwPrinter: name });
    toast.success(`Selected ${name}`);
  },
  
  cancelOrder: (id) => {
    set((state) => ({
      orders: state.orders.map(o => o.id === id ? { ...o, status: "cancelled" } : o)
    }));
    toast.error(`Order ${id} Cancelled`);
  },
  
  retryOrder: (id) => {
    set((state) => ({
      orders: state.orders.map(o => o.id === id ? { ...o, status: "pending", retries: o.retries + 1 } : o)
    }));
    toast.success(`Order ${id} Queued for Retry`);
  },
  
  clearCompleted: () => {
    set((state) => ({
      orders: state.orders.filter(o => o.status !== "printed" && o.status !== "cancelled")
    }));
    toast.success("Completed Jobs Cleared");
  },
  
  startPrinting: (id) => {
    set((state) => ({
      currentJobId: id,
      pagesPrinted: 0,
      printerStatus: "Busy",
      orders: state.orders.map(o => o.id === id ? { ...o, status: "printing" } : o)
    }));
  },
  
  updatePrintProgress: (pages) => {
    set({ pagesPrinted: pages });
  },
  
  completePrintJob: (id) => {
    set((state) => ({
      currentJobId: null,
      pagesPrinted: 0,
      printerStatus: "Ready",
      orders: state.orders.map(o => o.id === id ? { ...o, status: "printed" } : o)
    }));
    toast.success(`Order ${id} Printed Successfully`);
  },
  
  failPrintJob: (id, reason) => {
    set((state) => ({
      currentJobId: null,
      pagesPrinted: 0,
      printerStatus: "Ready",
      orders: state.orders.map(o => o.id === id ? { ...o, status: "failed", failureReason: reason } : o)
    }));
    toast.error(`Order ${id} Failed: ${reason}`);
  },
}));
