import { Card } from "../common/Card";
import { OrderCard } from "../orders/OrderCard";
import { OrderCardDto } from "../../types/app-state";

interface Props {
  orders: OrderCardDto[];
}

export function QueuePanel({
  orders,
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
            font-medium
            text-zinc-400
          "
        >
          Print Queue
        </h3>

        <span
          className="
            text-sm
            text-zinc-500
          "
        >
          {orders.length} Orders
        </span>
      </div>

      <div
        className="
          mt-4
          space-y-4
        "
      >
        {orders.length === 0 ? (
          <div
            className="
              rounded-xl
              border
              border-zinc-800
              p-6
              text-center
              text-zinc-500
            "
          >
            Queue Empty
          </div>
        ) : (
          orders.map(
            (order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                isNext={index === 0}
              />
            )
          )
        )}
      </div>

    </Card>
  );
}