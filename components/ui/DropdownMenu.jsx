"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/cn"

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      {typeof children === "function" ? children({ open, setOpen }) : children}
    </div>
  )
}

export function DropdownTrigger({ onClick, children, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full p-2",
        "hover:bg-primary-100 dark:hover:bg-white/10 transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  )
}

export function DropdownContent({ open, children, align = "right", className }) {
  if (!open) return null

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 min-w-[180px] rounded-xl border",
        "bg-white dark:bg-[#141a16] border-primary-200 dark:border-white/10",
        "shadow-lg shadow-black/10 dark:shadow-black/30",
        "py-1.5 animate-in fade-in-0 zoom-in-95",
        align === "right" && "right-0",
        align === "left" && "left-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export function DropdownItem({ onClick, children, variant = "default", className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 px-3.5 py-2 text-sm transition-colors cursor-pointer",
        variant === "default" && "text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-white/5",
        variant === "danger" && "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10",
        className
      )}
    >
      {children}
    </button>
  )
}