"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/cn"
import { cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white hover:bg-primary-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-600/25 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600",
        secondary:
          "bg-primary-100 text-primary-700 hover:bg-primary-200 hover:scale-[1.02] focus:ring-primary-500 dark:bg-white/10 dark:text-primary-200 dark:hover:bg-white/15",
        outline:
          "border border-primary-200 bg-transparent text-primary-700 hover:bg-primary-50 hover:scale-[1.02] focus:ring-primary-500 dark:border-white/10 dark:text-primary-200 dark:hover:bg-white/5",
        ghost:
          "bg-transparent text-primary-600 hover:bg-primary-100 hover:scale-[1.02] focus:ring-primary-500 dark:text-primary-300 dark:hover:bg-white/10",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-600/25 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600",
      },
      size: {
        default: "h-10 px-5 text-sm gap-2",
        sm: "h-8 px-3.5 text-xs gap-1.5",
        lg: "h-12 px-8 text-base gap-2.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = forwardRef(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }