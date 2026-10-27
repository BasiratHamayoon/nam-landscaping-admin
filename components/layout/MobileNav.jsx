"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Sidebar } from "./Sidebar"

export function MobileNav({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [open])

  if (!open) return null

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-card animate-in slide-in-from-left duration-300 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-5 w-8 h-8 rounded-full flex items-center justify-center bg-muted hover:bg-border cursor-pointer z-10"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
        <Sidebar collapsed={false} onMobileClose={onClose} />
      </div>
    </div>
  )
}