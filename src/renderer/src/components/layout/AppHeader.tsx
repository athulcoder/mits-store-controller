export function AppHeader() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h1
          className="
            text-2xl
            font-semibold
            text-white
          "
        >
          MITS Print Controller
        </h1>

        <p
          className="
            text-sm
            text-zinc-400
            mt-1
          "
        >
          Print Queue Management
        </p>
      </div>

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <div
          className="
            h-2
            w-2
            rounded-full
            bg-green-500
          "
        />

        <span
          className="
            text-sm
            text-zinc-300
          "
        >
          Connected
        </span>
      </div>
    </header>
  );
}