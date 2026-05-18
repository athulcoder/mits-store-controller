import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Printer, CheckCircle2, FileText, Layers, AlertTriangle, Loader2 } from "lucide-react"
import { useStore } from "../store/useStore"

export function PrinterStatusCard() {
  const { selectedBwPrinter, printerStatus, orders, currentJobId } = useStore();
  
  const currentOrder = orders.find(o => o.id === currentJobId);
  const queueLength = orders.filter(o => o.status === 'pending').length;

  return (
    <Card className="border-zinc-800 bg-zinc-900 shrink-0">
      <CardHeader className="pb-3 border-b border-zinc-800">
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <Printer className="w-5 h-5" />
          Printer Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-400">Printer</div>
          <div className="text-sm font-semibold text-zinc-100 text-right truncate max-w-[150px]">{selectedBwPrinter}</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-400">Status</div>
          <div className={`flex items-center gap-1.5 text-sm font-semibold ${
            printerStatus === 'Ready' ? 'text-green-500' :
            printerStatus === 'Busy' ? 'text-blue-500' : 'text-red-500'
          }`}>
            {printerStatus === 'Ready' && <CheckCircle2 className="w-4 h-4" />}
            {printerStatus === 'Busy' && <Loader2 className="w-4 h-4 animate-spin" />}
            {printerStatus === 'Offline' && <AlertTriangle className="w-4 h-4" />}
            {printerStatus}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-400">Currently Printing</div>
          <div className={`text-sm font-semibold ${currentOrder ? 'text-blue-500' : 'text-zinc-500'}`}>
            {currentOrder ? currentOrder.id : 'None'}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Queue Length
          </div>
          <div className="text-sm font-semibold text-zinc-100">{queueLength} Jobs</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-400 flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Paper Status
          </div>
          <div className="text-sm font-semibold text-green-500">OK - Tray 2</div>
        </div>
      </CardContent>
    </Card>
  )
}
