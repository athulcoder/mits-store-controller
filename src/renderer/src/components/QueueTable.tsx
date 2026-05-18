import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Search, Printer, X, FileText, RotateCcw } from "lucide-react"
import { useStore } from "../store/useStore"
import { CancelConfirmModal } from "./modals/CancelConfirmModal"
import { PdfPreviewModal } from "./modals/PdfPreviewModal"

export function QueueTable() {
  const { orders, startPrinting, retryOrder, cancelOrder, isAutoMode } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Modals state
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);
  const [pdfPreviewFile, setPdfPreviewFile] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.fileName.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesFilter = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "printing": return <Badge variant="printing">Printing</Badge>
      case "pending": return <Badge variant="pending">Pending</Badge>
      case "printed": return <Badge variant="printed">Printed</Badge>
      case "failed": return <Badge variant="destructive">Failed</Badge>
      case "cancelled": return <Badge variant="secondary">Cancelled</Badge>
      default: return <Badge>{status}</Badge>
    }
  }

  return (
    <>
      <Card className="flex flex-col h-full border-zinc-800 bg-zinc-900">
        <CardHeader className="border-b border-zinc-800 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-zinc-100">Print Queue</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 rounded-md border border-zinc-800 bg-zinc-950 px-8 text-sm text-zinc-100 outline-none focus:ring-1 focus:ring-blue-500 w-[250px]"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="printing">Printing</option>
                <option value="printed">Printed</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 bg-zinc-900 sticky top-0 border-b border-zinc-800 z-10">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Student Info</th>
                <th className="px-4 py-3 font-medium">Document</th>
                <th className="px-4 py-3 font-medium">Time Added</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 relative">
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-zinc-800/50 transition-colors group"
                >
                  <td className="px-4 py-3 font-medium text-zinc-100">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-100">{order.studentName}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {order.batch} • {order.className}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium truncate max-w-[180px] text-zinc-100" title={order.fileName}>
                      {order.fileName}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {order.pages} Pages
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{order.time}</td>
                  <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {order.status === "failed" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => retryOrder(order.id)}
                          className="h-8 gap-1 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Retry
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setPdfPreviewFile(order.fileName)}
                        className="h-8 gap-1 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View
                      </Button>
                      
                      {order.status === "pending" && !isAutoMode && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => startPrinting(order.id)}
                          className="h-8 gap-1 border-blue-500/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-500"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          Print
                        </Button>
                      )}

                      {order.status !== "printed" && order.status !== "cancelled" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCancelModalId(order.id)}
                          className="h-8 gap-1 border-red-500/50 hover:bg-red-600 hover:text-white hover:border-red-600 text-red-500"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <CancelConfirmModal
        isOpen={cancelModalId !== null}
        orderId={cancelModalId}
        onConfirm={() => {
          if (cancelModalId) cancelOrder(cancelModalId);
          setCancelModalId(null);
        }}
        onCancel={() => setCancelModalId(null)}
      />

      <PdfPreviewModal
        isOpen={pdfPreviewFile !== null}
        fileName={pdfPreviewFile}
        onClose={() => setPdfPreviewFile(null)}
      />
    </>
  )
}
