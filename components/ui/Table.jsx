import { cn } from "@/lib/cn"

export function Table({ children, className }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-primary-200 dark:border-white/10">
      <table className={cn("w-full text-sm", className)}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className }) {
  return (
    <thead className={cn(
      "bg-primary-50/80 dark:bg-white/5 border-b border-primary-200 dark:border-white/10",
      className
    )}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className }) {
  return <tbody className={cn("divide-y divide-primary-100 dark:divide-white/5", className)}>{children}</tbody>
}

export function TableRow({ children, className, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "transition-colors hover:bg-primary-50/50 dark:hover:bg-white/[0.03]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className }) {
  return (
    <th className={cn(
      "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider",
      "text-primary-500 dark:text-primary-400",
      className
    )}>
      {children}
    </th>
  )
}

export function TableCell({ children, className }) {
  return (
    <td className={cn(
      "px-4 py-3.5 text-primary-700 dark:text-primary-200",
      className
    )}>
      {children}
    </td>
  )
}