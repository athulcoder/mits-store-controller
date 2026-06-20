import { Card } from "../common/Card";
import { OrderAvatar } from "../orders/OrderAvatar";
import { PaymentBadge } from "../orders/PaymentBadge";
import type { OrderCardDto } from "../../types/app-state";

interface Props {
  order: OrderCardDto | null;
}

export function CurrentPrintCard({
  order,
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
          Currently Printing
        </h3>

        {order && (
          <div
            className="
              h-2
              w-2
              rounded-full
              bg-green-500
              animate-pulse
            "
          />
        )}
      </div>

      {!order && (

        <div
          className="
            mt-5
            text-zinc-500
          "
        >
          No active print job
        </div>

      )}

      {order && (

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <OrderAvatar
              name={order.userName}
              image={order.image}
            />

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {order.userName}
              </h2>

              <p
                className="
                  text-sm
                  text-zinc-400
                "
              >
                {order.batch}
                {" • "}
                {order.department}
              </p>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-3
                  text-sm
                "
              >
                <span
                  className="
                    text-zinc-300
                  "
                >
                  {order.printCount} Prints
                </span>

                <span
                  className="
                    text-zinc-500
                  "
                >
                  ₹{(
                    order.paymentAmount / 100
                  ).toFixed(2)}
                </span>
              </div>

            </div>

          </div>

          <PaymentBadge
            status={order.paymentStatus}
          />

        </div>

      )}

    </Card>
  );
}