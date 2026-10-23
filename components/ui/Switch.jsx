"use client"

import { cn } from "@/lib/cn"

export function Switch({ checked, onCheckedChange, className }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full",
        "border-2 border-transparent transition-colors duration-200",
        checked
          ? "bg-primary-600 dark:bg-primary-500"
          : "bg-primary-200 dark:bg-white/20",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full",
          "bg-white shadow-lg ring-0 transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
}