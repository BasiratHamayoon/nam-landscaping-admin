"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Settings, LogOut, User, ChevronDown } from "lucide-react"
import toast from "react-hot-toast"
import { Avatar } from "@/components/ui/Avatar"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { logoutAdmin } from "@/store/slices/authSlice"

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.auth)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogoutClick = () => {
    setOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleConfirmLogout = async () => {
    setLoggingOut(true)
    try {
      await dispatch(logoutAdmin()).unwrap()
    } catch {
      // Ignore backend errors — clear client state regardless
    }
    toast.success("Logged out successfully")
    // Hard redirect — bypasses Next.js router cache completely
    window.location.href = "/login"
  }

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
        >
          <Avatar src={admin?.avatar} name={admin?.name} size="md" />
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {admin?.name || "Admin"}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {admin?.role || "Administrator"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50">
            <div className="p-4 border-b border-border bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/10">
              <div className="flex items-center gap-3">
                <Avatar src={admin?.avatar} name={admin?.name} size="lg" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {admin?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {admin?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4" />
                My Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <div className="my-1 h-px bg-border" />
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors cursor-pointer font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
        title="Sign out of your account?"
        description="You will be redirected to the login page and will need to sign in again to access the admin panel."
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
        variant="danger"
        loading={loggingOut}
      />
    </>
  )
}