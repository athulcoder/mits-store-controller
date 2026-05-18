import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { useStore } from "../store/useStore"

export function FailedJobs() {
  const { orders, retryOrder } = useStore();
  const failedJobs = orders.filter(o => o.status === 'failed');

  if (failedJobs.length === 0) {
    return null;
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900 shrink-0">
      <CardHeader className="pb-3 border-b border-zinc-800">
        <CardTitle className="flex items-center gap-2 text-red-500">
          <AlertTriangle className="w-5 h-5" />
          Failed Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[300px] overflow-auto custom-scrollbar">
        <div className="divide-y divide-zinc-800">
          {failedJobs.map((job) => (
            <div key={job.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-100">{job.id}</span>
                  <span className="text-zinc-500 text-sm">• {job.studentName}</span>
                </div>
                <div className="text-sm text-red-500 mt-1 font-medium">{job.failureReason || "Unknown Error"}</div>
                <div className="text-xs text-zinc-500 mt-0.5">Retries: {job.retries}/3</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="destructive">Failed</Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => retryOrder(job.id)}
                  className="h-7 text-xs gap-1 border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                >
                  <RotateCcw className="w-3 h-3" />
                  Retry
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
