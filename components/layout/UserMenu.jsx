"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Settings, LogOut, User, ChevronDown } from "lucide-react"
import toast from "react-hot-toast"
import { Avatar } from "@/components/ui/Avatar"
import { logoutAdmin } from "@/store/slices/authSlice"

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
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

  const handleLogout = async () => {
    await dispatch(logoutAdmin())
    toast.success("Logged out successfully")
    router.push("/login")
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
      >
        <Avatar src={admin?.avatar?.url} name={admin?.name} size="md" />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-semibold text-foreground leading-tight">{admin?.name || "Admin"}</span>
          <span className="text-xs text-muted-foreground">{admin?.role || "Administrator"}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar src={admin?.avatar?.url} name={admin?.name} size="lg" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{admin?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{admin?.email}</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}