import { cn } from "@/lib/cn"

export function Card({ children, className }) {
  return (
    <div className={cn("bg-card border border-border rounded-2xl shadow-sm", className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return <div className={cn("p-6 border-b border-border", className)}>{children}</div>
}

export function CardTitle({ children, className }) {
  return <h3 className={cn("text-lg font-bold text-foreground", className)}>{children}</h3>
}

export function CardDescription({ children, className }) {
  return <p className={cn("text-sm text-muted-foreground mt-1", className)}>{children}</p>
}

export function CardContent({ children, className }) {
  return <div className={cn("p-6", className)}>{children}</div>
}

export function CardFooter({ children, className }) {
  return <div className={cn("p-6 border-t border-border", className)}>{children}</div>
}