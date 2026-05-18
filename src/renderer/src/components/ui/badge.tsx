import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "pending" | "printing" | "printed" | "failed"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        {
          "bg-blue-500 text-white hover:bg-blue-600": variant === "default",
          "bg-zinc-800 text-white hover:bg-zinc-700": variant === "secondary",
          "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
          "border border-zinc-800 text-zinc-100": variant === "outline",
          
          "bg-yellow-500/20 text-yellow-500": variant === "pending",
          "bg-blue-500/20 text-blue-500": variant === "printing",
          "bg-green-500/20 text-green-500": variant === "printed",
          "bg-red-500/20 text-red-500": variant === "failed",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
