import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Printer } from "lucide-react"
import { useStore } from "../store/useStore"

export function SettingsPanel() {
  const { selectedColorPrinter, selectedBwPrinter, setPrinter } = useStore();

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900 shrink-0">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <Printer className="w-5 h-5" />
            Printer Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-100">Color Printer</label>
            <select 
              value={selectedColorPrinter}
              onChange={(e) => setPrinter('color', e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option>HP Color LaserJet Pro</option>
              <option>Canon Color Printer</option>
              <option>Epson EcoTank</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-100">Black & White Printer</label>
            <select 
              value={selectedBwPrinter}
              onChange={(e) => setPrinter('bw', e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-100 outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option>HP LaserJet Pro M404n</option>
              <option>Brother HL-L2321D</option>
              <option>Xerox WorkCentre</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
