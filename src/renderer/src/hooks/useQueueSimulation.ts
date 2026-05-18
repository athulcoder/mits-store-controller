import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export function useQueueSimulation() {
  const { 
    orders, 
    isAutoMode, 
    isPaused, 
    currentJobId, 
    startPrinting, 
    updatePrintProgress, 
    completePrintJob, 
    failPrintJob 
  } = useStore();

  const printTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto Mode Engine: Find next pending job if not printing
  useEffect(() => {
    if (!isAutoMode || isPaused || currentJobId) return undefined;

    const nextPending = orders.find(o => o.status === 'pending');
    if (nextPending) {
      // Simulate slight delay before picking up the next job
      const pickupTimer = setTimeout(() => {
        startPrinting(nextPending.id);
      }, 1500);
      return () => clearTimeout(pickupTimer);
    }
    
    return undefined;
  }, [orders, isAutoMode, isPaused, currentJobId, startPrinting]);

  // Printing Progress Simulation Engine
  useEffect(() => {
    if (!currentJobId || isPaused) {
      if (printTimerRef.current) clearInterval(printTimerRef.current);
      return;
    }

    const currentOrder = orders.find(o => o.id === currentJobId);
    if (!currentOrder) return;

    let pagesDone = 0;
    
    // Simulate printing 1 page every 500ms
    printTimerRef.current = setInterval(() => {
      pagesDone++;
      updatePrintProgress(pagesDone);

      // Random failure simulation (5% chance per page)
      if (Math.random() < 0.05 && currentOrder.retries < 3) {
        if (printTimerRef.current) clearInterval(printTimerRef.current);
        failPrintJob(currentJobId, "Paper Jam / Printer Offline");
        return;
      }

      if (pagesDone >= currentOrder.pages) {
        if (printTimerRef.current) clearInterval(printTimerRef.current);
        completePrintJob(currentJobId);
      }
    }, 500);

    return () => {
      if (printTimerRef.current) clearInterval(printTimerRef.current);
    };
  }, [currentJobId, isPaused, orders, updatePrintProgress, completePrintJob, failPrintJob]);
}
