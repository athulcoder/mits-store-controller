import { LayoutDashboard, ListOrdered, History, AlertCircle, Terminal, Settings } from "lucide-react"
import { useStore } from "../store/useStore"

export function Sidebar() {
  const { isAutoMode, isPaused } = useStore();

  const items = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Queue", icon: ListOrdered },
    { name: "History", icon: History },
    { name: "Failed Jobs", icon: AlertCircle },
    { name: "Logs", icon: Terminal },
    { name: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col h-full shrink-0">
      <div className="p-4 space-y-2 flex-1">
        {items.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? "bg-blue-500/10 text-blue-500"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400 mb-1">Queue Status</div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isPaused ? "bg-yellow-500" : isAutoMode ? "bg-green-500 animate-pulse" : "bg-zinc-500"
            }`} />
            <span className="text-sm font-medium text-zinc-100">
              {isPaused ? "Paused" : isAutoMode ? "Processing (Auto)" : "Manual Mode"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
