interface Props {
  status: string;
}

export function PaymentBadge({
  status,
}: Props) {

  const styles = {

    PAID:
      "bg-green-500/15 text-green-400",

    PENDING:
      "bg-yellow-500/15 text-yellow-400",

    FAILED:
      "bg-red-500/15 text-red-400",

    REFUNDED:
      "bg-zinc-500/15 text-zinc-400",
  };

  return (
    <span
      className={`
      px-2
      py-1
      rounded-lg
      text-xs
      font-medium
      ${
        styles[
          status as keyof typeof styles
        ] ??
        styles.PENDING
      }
    `}
    >
      {status}
    </span>
  );
}