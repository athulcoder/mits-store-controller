import { Card } from "../common/Card";

interface WorkerCardProps {
  title: string;
  running: boolean;
  value?: string;
  label?: string;
}

export function WorkerCard({
  title,
  running,
  value,
  label,
}: WorkerCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">

        <div>
          <h3
            className="
              text-sm
              font-medium
              text-zinc-400
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-4
              text-lg
              font-semibold
              text-white
            "
          >
            {running
              ? "Running"
              : "Stopped"}
          </p>
        </div>

        <div
          className={`
            h-3
            w-3
            rounded-full
            ${
              running
                ? "bg-green-500"
                : "bg-red-500"
            }
          `}
        />
      </div>

      {value && (
        <div className="mt-5">

          <p
            className="
              text-xs
              text-zinc-500
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              text-sm
              text-zinc-200
            "
          >
            {value}
          </p>

        </div>
      )}
    </Card>
  );
}