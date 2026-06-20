interface Props {
    name: string;
    image?: string | null;
}

const avatarColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
];

function getAvatarColor(name: string) {

    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash =
            name.charCodeAt(i) +
            ((hash << 5) - hash);
    }

    return avatarColors[
        Math.abs(hash) %
        avatarColors.length
    ];
}

export function OrderAvatar({
    name,
    image,
}: Props) {

    const initial =
        name
            ?.trim()
            ?.charAt(0)
            ?.toUpperCase() || "?";

    if (image) {

        return (
            <img
                src={image}
                alt={name}
                onError={(e) => {
                    e.currentTarget.style.display =
                        "none";
                }}
                className="
                    h-10
                    w-10
                    rounded-full
                    object-cover
                    border
                    border-zinc-700
                    shrink-0
                "
            />
        );
    }

    return (
        <div
            className={`
                h-10
                w-10
                rounded-full
                flex
                items-center
                justify-center
                text-sm
                font-semibold
                text-white
                shrink-0
                ${getAvatarColor(name)}
            `}
        >
            {initial}
        </div>
    );
}