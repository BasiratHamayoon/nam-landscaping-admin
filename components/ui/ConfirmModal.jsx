// components/ui/ConfirmModal.jsx
"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AlertTriangle, X } from "lucide-react"
import gsap from "gsap"
import { Button } from "./Button"

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  const modalRef = useRef(null)
  const backdropRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (open && modalRef.current && backdropRef.current) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" }
      )
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "unset"
    }
  }, [open, onClose])

  if (!open || !mounted) return null

  const iconColor =
    variant === "danger"
      ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
      : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-muted hover:bg-border transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className={`w-14 h-14 rounded-2xl ${iconColor} flex items-center justify-center mb-4`}
        >
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
            className={`flex-1 ${
              variant === "danger"
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : ""
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}