import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Play, Pause, Settings2, RotateCcw, Trash2 } from "lucide-react"
import { useStore } from "../store/useStore"

export function QueueControls() {
  const { 
    isAutoMode, 
    setMode, 
    isPaused, 
    setPaused, 
    orders,
    retryOrder,
    clearCompleted
  } = useStore();

  const handleRetryFailed = () => {
    orders.forEach(o => {
      if (o.status === 'failed') retryOrder(o.id);
    });
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900 shrink-0">
      <CardHeader className="pb-3 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <Settings2 className="w-5 h-5" />
            Queue Control
          </CardTitle>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isAutoMode ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
          }`}>
            <div className={`w-2 h-2 rounded-full ${isAutoMode ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
            {isAutoMode ? "AUTO MODE ACTIVE" : "MANUAL MODE ACTIVE"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant={isAutoMode ? "default" : "outline"} 
            onClick={() => setMode(true)}
            className={`w-full justify-start gap-2 ${isAutoMode ? "bg-green-600 hover:bg-green-700 border-transparent text-white focus-visible:ring-green-500" : ""}`}
          >
            <Play className="w-4 h-4" />
            Automatic Mode
          </Button>
          <Button 
            variant={!isAutoMode ? "default" : "outline"} 
            onClick={() => setMode(false)}
            className={`w-full justify-start gap-2 ${!isAutoMode ? "bg-yellow-500 hover:bg-yellow-600 border-transparent text-black focus-visible:ring-yellow-500" : ""}`}
          >
            <Pause className="w-4 h-4" />
            Manual Mode
          </Button>
        </div>

        <div className="border-t border-zinc-800 pt-4 grid grid-cols-2 gap-3">
          <Button 
            variant="secondary" 
            onClick={() => setPaused(!isPaused)}
            className={`w-full justify-start gap-2 ${isPaused ? "bg-zinc-700 text-zinc-100" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"}`}
          >
            {isPaused ? <Play className="w-4 h-4 text-green-500" /> : <Pause className="w-4 h-4 text-yellow-500" />}
            {isPaused ? "Resume Queue" : "Pause Queue"}
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleRetryFailed}
            className="w-full justify-start gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
          >
            <RotateCcw className="w-4 h-4 text-blue-500" />
            Retry Failed
          </Button>
          <Button 
            variant="secondary" 
            onClick={clearCompleted}
            className="w-full justify-start gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 col-span-2"
          >
            <Trash2 className="w-4 h-4 text-zinc-400" />
            Clear Completed
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
