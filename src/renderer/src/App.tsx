import { Sidebar } from "./components/Sidebar"
import { Topbar } from "./components/Topbar"
import { DashboardStats } from "./components/DashboardStats"
import { QueueTable } from "./components/QueueTable"
import { PrinterStatusCard } from "./components/PrinterStatusCard"
import { CurrentPrintingCard } from "./components/CurrentPrintingCard"
import { QueueControls } from "./components/QueueControls"
import { FailedJobs } from "./components/FailedJobs"
import { LogsPanel } from "./components/LogsPanel"
import { SettingsPanel } from "./components/SettingsPanel"
import { Toaster } from 'react-hot-toast'
import { useQueueSimulation } from "./hooks/useQueueSimulation"

function App(): React.JSX.Element {
  useQueueSimulation();

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans selection:bg-blue-500/30 selection:text-white">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#18181b', // zinc-900
          color: '#f4f4f5', // zinc-100
          border: '1px solid #27272a', // zinc-800
        }
      }} />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <DashboardStats />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[600px]">
              {/* Left Column: Queue Table */}
              <div className="xl:col-span-2 h-full">
                {/* <QueueTable /> */}
              </div>
              
              {/* Right Column: Status & Controls */}
              <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
                <QueueControls />
                <SettingsPanel />
                <CurrentPrintingCard />
                <PrinterStatusCard />
                <FailedJobs />
                <div className="flex-1 min-h-[250px]">
                  <LogsPanel />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
