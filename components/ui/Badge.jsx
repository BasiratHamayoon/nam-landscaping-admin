import { cn } from "@/lib/cn"

const variants = {
  default: "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  destructive: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  outline: "border border-border text-muted-foreground",
}

export function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}