import { cn } from "@/lib/cn"

export function Skeleton({ className }) {
  return <div className={cn("animate-shimmer rounded-xl", className)} />
}