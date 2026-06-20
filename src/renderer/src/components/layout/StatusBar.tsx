import { formatRelativeTime } from "../../utils/formatRelativeTime";

interface Props {
    fetchRunning: boolean;
    printRunning: boolean;
    queueCount: number;
    lastSync: string | null;
}

export function StatusBar({
    fetchRunning,
    printRunning,
    queueCount,
    lastSync,
}: Props) {
    return (
        <div
            className="
        flex
        flex-wrap
        items-center
        gap-3
      "
        >
            <StatusPill
                label="Fetch"
                active={fetchRunning}
            />

            <StatusPill
                label="Print"
                active={printRunning}
            />

            <StatusPill
                label={`Queue ${queueCount}`}
                active={queueCount > 0}
            />

            <span
                className="
          text-xs
          text-zinc-500
        "
            >
                Last Sync:
                {" "}
                {formatRelativeTime(lastSync ?? "") ?? "Never"}
            </span>
        </div>
    );
}

function StatusPill({
    label,
    active,
}: {
    label: string;
    active: boolean;
}) {
    return (
        <div
            className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-zinc-800
        bg-zinc-900
        px-3
        py-1.5
      "
        >
            <div
                className={`
          h-2
          w-2
          rounded-full
          ${active
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
        `}
            />

            <span
                className="
          text-sm
          text-zinc-300
        "
            >
                {label}
            </span>
        </div>
    );
}