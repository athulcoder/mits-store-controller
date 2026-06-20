import { Card } from "../common/Card";
import { OrderAvatar } from "./OrderAvatar";
import { PaymentBadge } from "./PaymentBadge";

import { formatRelativeTime }
from "../../utils/formatRelativeTime";

interface Props {

  order: {

    id: string;

    userName: string;

    batch: string | null;

    department: string | null;

    image: string | null;

    paymentStatus: string;

    printCount: number;

    createdAt: string;
  };

  isNext?: boolean;
}

export function OrderCard({
  order,
  isNext,
}: Props) {

  return (
    <Card
      className={
        isNext
          ? "border-blue-500"
          : ""
      }
    >

      <div
        className="
        flex
        justify-between
        items-start
      "
      >
        <div
          className="
          flex
          gap-3
        "
        >

          <OrderAvatar
            name={
              order.userName
            }
            image={
              order.image
            }
          />

          <div>

            <p
              className="
              text-white
              font-medium
            "
            >
              {order.userName}
            </p>

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

          </div>

        </div>

        <PaymentBadge
          status={
            order.paymentStatus
          }
        />
      </div>

      <div
        className="
        mt-4
        flex
        justify-between
        text-sm
        text-zinc-400
      "
      >

        <span>
          {order.printCount}
          {" "}
          Prints
        </span>

        <span>
          {formatRelativeTime(
            order.createdAt
          )}
        </span>

      </div>

      {isNext && (

        <div
          className="
          mt-3
          text-xs
          text-blue-400
          font-medium
        "
        >
          NEXT TO PRINT
        </div>

      )}

    </Card>
  );
}