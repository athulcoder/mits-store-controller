import { Card, CardContent } from "./ui/card"
import { Clock, Printer, CheckCircle2, XCircle } from "lucide-react"
import { useStore } from "../store/useStore"

export function DashboardStats() {
  const { orders } = useStore();

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const printingCount = orders.filter(o => o.status === 'printing').length;
  const completedCount = orders.filter(o => o.status === 'printed').length;
  const failedCount = orders.filter(o => o.status === 'failed').length;

  const stats = [
    {
      title: "Pending Orders",
      value: pendingCount.toString(),
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Printing Now",
      value: printingCount.toString(),
      icon: Printer,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Completed Today",
      value: completedCount.toString(),
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Failed Orders",
      value: failedCount.toString(),
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-zinc-800 bg-zinc-900">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-1">{stat.title}</p>
              <h2 className="text-3xl font-bold text-zinc-100">{stat.value}</h2>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
