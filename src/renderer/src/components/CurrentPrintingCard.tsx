import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Activity, Clock } from "lucide-react"
import { useStore } from "../store/useStore"

export function CurrentPrintingCard() {
  const { currentJobId, orders, pagesPrinted } = useStore();
  const currentOrder = orders.find(o => o.id === currentJobId);

  if (!currentOrder) {
    return (
      <Card className="border-zinc-800 bg-zinc-900 shrink-0">
        <CardHeader className="pb-3 border-b border-zinc-800">
          <CardTitle className="flex items-center gap-2 text-zinc-500">
            <Activity className="w-5 h-5" />
            Currently Printing
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center text-zinc-500 text-sm">
          No active print jobs
        </CardContent>
      </Card>
    );
  }

  const progress = Math.round((pagesPrinted / currentOrder.pages) * 100);

  return (
    <Card className="border-zinc-800 bg-zinc-900 relative overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
      <CardHeader className="pb-3 border-b border-zinc-800 relative z-10">
        <CardTitle className="flex items-center gap-2 text-blue-500">
          <Activity className="w-5 h-5" />
          Currently Printing
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-bold text-zinc-100">{currentOrder.studentName}</div>
            <div className="text-sm font-medium text-zinc-400 mt-0.5">{currentOrder.id} • {currentOrder.batch}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-blue-500">{pagesPrinted} / {currentOrder.pages} Pages</div>
            <div className="text-xs text-zinc-500 mt-0.5">{progress}% Complete</div>
          </div>
        </div>

        <div className="w-full bg-zinc-950 border border-zinc-800 rounded-full h-2.5 overflow-hidden">
          <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="font-medium flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-4 h-4" />
            Estimated Time
          </div>
          <div className="font-semibold text-zinc-100">
            {Math.max(0, currentOrder.pages - pagesPrinted)}s
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
