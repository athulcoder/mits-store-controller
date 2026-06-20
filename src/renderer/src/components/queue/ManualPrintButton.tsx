interface Props {
  orderId: string;
  loading: boolean;
  onPrint: () => void;
}

export function ManualPrintButton({
  orderId,
  loading,
  onPrint,
}: Props) {
  return (
    <button
      disabled={loading}
      onClick={onPrint}
      className="
      w-full
      rounded-xl
      bg-white
      px-4
      py-3
      text-black
      font-medium
      transition
      disabled:opacity-50
    "
    >
      {loading
        ? "Sending..."
        : `Print ${orderId}`}
    </button>
  );
}