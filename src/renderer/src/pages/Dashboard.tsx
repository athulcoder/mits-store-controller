import { AppHeader } from "../components/layout/AppHeader";
import { ModeSwitcher } from "../components/mode/ModeSwitcher";
import { CurrentPrintCard } from "../components/printing/CurrentPrintCard";
import { QueuePanel } from "../components/queue/QueuePanel";
import { WorkerCard } from "../components/workers/WorkerCard";
import { useInitializeApp } from "../hooks/useInitializeApp";
import { useAppStore } from "../store/appStore";

export function Dashboard() {

    useInitializeApp();

    const appState =
        useAppStore(
            state => state.state
        );

    const state =
        useAppStore(
            s => s.state
        );

    if (!appState) {

        return (
            <div>
                Loading...
            </div>
        );
    }
    return (
        <main
            className="
        min-h-screen
        bg-[#0f1117]
        text-white
      "
        >

            <div
                className="
          mx-auto
          max-w-6xl
          p-6
          space-y-6
        "
            >
                <AppHeader />

                <div
                    className="
            grid
            gap-4
            lg:grid-cols-2
          "
                >
                    <WorkerCard
                        title="Fetch Worker"
                        running={
                            appState.worker1.running
                        }
                        label="Last Sync"
                        value={
                            appState.worker1.lastSyncAt ??
                            "Never"
                        }
                    />

                    <WorkerCard
                        title="Print Worker"
                        running={
                            appState.worker2.running
                        }
                        label="Current Order"
                        value={
                            appState.worker2.currentOrderId ??
                            "Idle"
                        }
                    />


                </div>

                <ModeSwitcher
                    mode={state.mode}
                    onChange={(mode) => {
                        window.api.setMode(mode);
                    }}
                />


                <CurrentPrintCard
                    orderId={
                        state.worker2.currentOrderId
                    }
                />
                <QueuePanel
                    orderIds={
                        state.queue.orderIds
                    }
                />

            </div>
        </main>
    );
}