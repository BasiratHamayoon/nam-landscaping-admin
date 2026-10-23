"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/cn"
import { Button } from "./Button"

export function Dialog({ open, onClose, children, className }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
    >
      <div
        className={cn(
          "relative w-full max-w-md rounded-2xl border",
          "bg-white dark:bg-[#141a16] border-primary-200 dark:border-white/10",
          "shadow-2xl shadow-black/20 p-6 animate-in zoom-in-95",
          className
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <X className="w-4 h-4" />
        </Button>
        {children}
      </div>
    </div>
  )
}

export function DialogTitle({ children, className }) {
  return (
    <h2 className={cn("text-lg font-heading font-semibold text-primary-900 dark:text-white pr-8", className)}>
      {children}
    </h2>
  )
}

export function DialogDescription({ children, className }) {
  return (
    <p className={cn("mt-1.5 text-sm text-primary-500 dark:text-primary-400", className)}>
      {children}
    </p>
  )
}

export function DialogFooter({ children, className }) {
  return (
    <div className={cn("mt-6 flex items-center justify-end gap-3", className)}>
      {children}
    </div>
  )
}