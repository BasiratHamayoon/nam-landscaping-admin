"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/cn"
import { ChevronDown } from "lucide-react"

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-xl border border-primary-200 dark:border-white/10",
          "bg-white dark:bg-white/5 px-4 py-2.5 pr-10 text-sm",
          "text-primary-900 dark:text-white",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500",
          "dark:focus:ring-primary-400/30 dark:focus:border-primary-400",
          "transition-all duration-200 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
    </div>
  )
})

Select.displayName = "Select"

export { Select }