import { cn } from "@/lib/cn"

export function Label({ children, htmlFor, className, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-semibold text-foreground mb-2", className)}
      {...props}
    >
      {children}
    </label>
  )
}