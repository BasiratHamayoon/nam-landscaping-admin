"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/cn"

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-primary-200 dark:border-white/10",
        "bg-white dark:bg-white/5 px-4 py-2.5 text-sm min-h-[100px]",
        "text-primary-900 dark:text-white placeholder:text-primary-400",
        "focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500",
        "dark:focus:ring-primary-400/30 dark:focus:border-primary-400",
        "transition-all duration-200 resize-y",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export { Textarea }