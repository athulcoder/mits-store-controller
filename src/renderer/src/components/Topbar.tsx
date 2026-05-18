import { Bell, Settings, Printer } from "lucide-react"

export function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="font-semibold text-lg flex items-center gap-2 text-zinc-100">
          <Printer className="w-5 h-5 text-blue-500" />
          Store Controller
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-zinc-400">HP LaserJet Pro (Ready)</span>
        </div>
        <button className="relative p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950" />
        </button>
        <button className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium text-white ml-2">
          OP
        </div>
      </div>
    </header>
  )
}
