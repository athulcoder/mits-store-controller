import { Card } from "../common/Card";
import { QueueItem } from "./QueueItem";

interface Props {
  orderIds: string[];
}

export function QueuePanel({
  orderIds,
}: Props) {
  return (
    <Card>

      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <h3
          className="
          text-sm
          text-zinc-400
        "
        >
          Queue
        </h3>

        <span
          className="
          text-sm
          text-zinc-500
        "
        >
          {orderIds.length} Orders
        </span>
      </div>

      <div
        className="
        mt-4
        space-y-3
      "
      >
        {orderIds.length === 0 ? (
          <p
            className="
            text-zinc-500
          "
          >
            Queue Empty
          </p>
        ) : (
          orderIds.map(
            (orderId, index) => (
              <QueueItem
                key={orderId}
                orderId={orderId}
                isFirst={index === 0}
              />
            )
          )
        )}
      </div>

    </Card>
  );
}