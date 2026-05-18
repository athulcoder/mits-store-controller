import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TerminalSquare } from "lucide-react"

export function LogsPanel() {
  const logs = [
    "[INFO] 10:32:45 Queue Worker Started",
    "[INFO] 10:32:50 Printing ORD-102 (Athul Sabu)",
    "[DEBUG] 10:32:51 Sending 14 pages to HP LaserJet Pro M404n",
    "[WARN] 10:33:10 Low toner warning on HP LaserJet",
    "[INFO] 10:35:12 Print job ORD-101 completed successfully",
    "[ERROR] 10:45:00 Printer Offline for ORD-105",
    "[INFO] 10:45:05 Attempting auto-retry for ORD-105 (1/3)",
  ]

  return (
    <Card className="border-zinc-800 h-full flex flex-col bg-zinc-950">
      <CardHeader className="pb-3 border-b border-zinc-800 bg-zinc-900">
        <CardTitle className="flex items-center gap-2 text-sm font-medium font-mono text-zinc-400">
          <TerminalSquare className="w-4 h-4" />
          System Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1 overflow-auto font-mono text-xs">
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={`
                ${log.includes("[ERROR]") ? "text-red-500" : ""}
                ${log.includes("[WARN]") ? "text-yellow-500" : ""}
                ${log.includes("[DEBUG]") ? "text-zinc-500" : ""}
                ${log.includes("[INFO]") ? "text-zinc-300" : ""}
              `}
            >
              {log}
            </div>
          ))}
          <div className="text-zinc-500 mt-4 flex items-center gap-2">
            <span className="w-2 h-4 bg-zinc-500 animate-pulse inline-block" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
