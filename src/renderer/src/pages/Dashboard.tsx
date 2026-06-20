import { AppHeader } from "../components/layout/AppHeader";
import { ModeSwitcher } from "../components/mode/ModeSwitcher";
import { CurrentPrintCard } from "../components/printing/CurrentPrintCard";
import { QueuePanel } from "../components/queue/QueuePanel";
import { WorkerCard } from "../components/workers/WorkerCard";
import { useInitializeApp } from "../hooks/useInitializeApp";
import { useAppStore } from "../store/appStore";

export function Dashboard() {

    useInitializeApp();

    const appState = useAppStore(
        state => state.state
    );

    if (!appState) {
        return (
            <main
                className="
                min-h-screen
                bg-[#0f1117]
                text-white
                flex
                items-center
                justify-center
            "
            >
                <p className="text-zinc-500">
                    Loading...
                </p>
            </main>
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
                max-w-7xl
                p-6
                space-y-6
            "
            >
                <AppHeader />

                {/* Mode Switch */}

                <div className="flex justify-center">
                    <ModeSwitcher
                        mode={appState.mode}
                        onChange={(mode) => {
                            window.api.setMode(mode);
                        }}
                    />
                </div>

                {/* Worker Status */}

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

                {/* Current Printing */}

                <CurrentPrintCard
                    orderId={
                        appState.worker2.currentOrderId
                    }
                />

                {/* Queue */}

                <QueuePanel
                    orderIds={
                        appState.queue.orderIds
                    }
                />
            </div>
        </main>
    );
}