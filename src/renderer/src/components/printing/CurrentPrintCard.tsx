import { Card } from "../common/Card";

interface Props {
  orderId?: string | null;
}

export function CurrentPrintCard({
  orderId,
}: Props) {
  return (
    <Card>

      <div>

        <h3
          className="
          text-sm
          text-zinc-400
          font-medium
        "
        >
          Current Printing
        </h3>

        <div className="mt-4">

          {orderId ? (
            <>
              <p
                className="
                text-xl
                font-semibold
                text-white
              "
              >
                {orderId}
              </p>

              <p
                className="
                mt-2
                text-zinc-400
              "
              >
                Sending to printer...
              </p>
            </>
          ) : (
            <p
              className="
              text-zinc-500
            "
            >
              No active print job
            </p>
          )}

        </div>

      </div>

    </Card>
  );
}