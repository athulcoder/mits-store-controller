interface Props {
  name: string;
  image?: string | null;
}

export function OrderAvatar({
  name,
  image,
}: Props) {

  if (image) {

    return (
      <img
        src={image}
        alt={name}
        className="
          h-10
          w-10
          rounded-full
          object-cover
        "
      />
    );
  }

  return (
    <div
      className="
      h-10
      w-10
      rounded-full
      bg-zinc-700
      flex
      items-center
      justify-center
      text-sm
      font-semibold
      text-white
    "
    >
      {name
        .charAt(0)
        .toUpperCase()}
    </div>
  );
}