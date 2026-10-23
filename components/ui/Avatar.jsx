"use client"

import { useState } from "react"
import { cn } from "@/lib/cn"

export function Avatar({ src, name = "A", size = "md", className }) {
  const [error, setError] = useState(false)

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  }

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-semibold shrink-0",
        sizes[size],
        className
      )}
    >
      {src && !error ? (
        <img src={src} alt={name} onError={() => setError(true)} className="w-full h-full object-cover" />
      ) : (
        <span>{name?.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}