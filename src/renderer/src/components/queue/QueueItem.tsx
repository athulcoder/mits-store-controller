interface Props {
  orderId: string;
  isFirst?: boolean;
}

export function QueueItem({
  orderId,
  isFirst,
}: Props) {
  return (
    <div
      className={`
      rounded-xl
      border
      p-3

      ${
        isFirst
          ? "border-blue-500 bg-blue-500/10"
          : "border-zinc-800 bg-zinc-900/50"
      }
    `}
    >
      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <span
          className="
          text-sm
          text-white
        "
        >
          {orderId}
        </span>

        {isFirst && (
          <span
            className="
            text-xs
            text-blue-400
          "
          >
            NEXT
          </span>
        )}
      </div>
    </div>
  );
}