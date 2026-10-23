import { cn } from "@/lib/cn"

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      {Icon && (
        <div className="mb-4 rounded-2xl bg-primary-100 dark:bg-white/5 p-4">
          <Icon className="w-8 h-8 text-primary-400 dark:text-primary-500" />
        </div>
      )}
      <h3 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-1.5">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-primary-500 dark:text-primary-400 max-w-sm mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}