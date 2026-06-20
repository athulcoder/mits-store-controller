import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/70
        backdrop-blur-sm
        p-5
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}