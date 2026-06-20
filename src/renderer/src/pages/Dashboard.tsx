import { AppHeader } from "../components/layout/AppHeader";
import { StatusBar } from "../components/layout/StatusBar";
import { ModeSwitcher } from "../components/mode/ModeSwitcher";
import { CurrentPrintCard } from "../components/printing/CurrentPrintCard";
import { QueuePanel } from "../components/queue/QueuePanel";
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

                <StatusBar
                    fetchRunning={
                        appState.worker1.running
                    }
                    printRunning={
                        appState.worker2.running
                    }
                    queueCount={
                        appState.queue.totalOrders
                    }
                    lastSync={
                        appState.worker1.lastSyncAt
                    }
                />

                {/* Current Printing */}

                <CurrentPrintCard
                    order={
                        appState.worker2.currentOrder
                    }
                />

                {/* Queue */}

                <QueuePanel
                    orders={
                        appState.queue.orders
                    }
                />
            </div>
        </main>
    );
}