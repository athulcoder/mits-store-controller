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
        font-medium
        text-black
        transition
        hover:opacity-90
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading
        ? "Sending To Printer..."
        : `Print ${orderId}`}
    </button>
  );
}