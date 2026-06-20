interface ModeSwitcherProps {
  mode: "AUTO" | "MANUAL";
  onChange: (
    mode: "AUTO" | "MANUAL"
  ) => void;
}

export function ModeSwitcher({
  mode,
  onChange,
}: ModeSwitcherProps) {
  return (
    <div
      className="
      inline-flex
      rounded-xl
      border
      border-zinc-800
      bg-zinc-900
      p-1
    "
    >
      <button
        onClick={() =>
          onChange("AUTO")
        }
        className={`
          px-4
          py-2
          rounded-lg
          text-sm
          transition

          ${
            mode === "AUTO"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400"
          }
        `}
      >
        Automatic
      </button>

      <button
        onClick={() =>
          onChange("MANUAL")
        }
        className={`
          px-4
          py-2
          rounded-lg
          text-sm
          transition

          ${
            mode === "MANUAL"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400"
          }
        `}
      >
        Manual
      </button>
    </div>
  );
}