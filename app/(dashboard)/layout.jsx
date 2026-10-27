"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"
import { fetchMe } from "@/store/slices/authSlice"
import { Loader2, Leaf } from "lucide-react"

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [checking, setChecking] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const verify = async () => {
      const result = await dispatch(fetchMe())
      if (fetchMe.rejected.match(result)) {
        window.location.href = "/login"
        return
      }
      setChecking(false)
    }
    verify()
  }, [dispatch])

  if (checking) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-700 flex items-center justify-center shadow-xl">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">
          Verifying your session...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
    return null
  }

  return (
    <div className="min-h-screen w-full flex bg-background overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <div className="fixed h-screen">
          <Sidebar collapsed={sidebarCollapsed} />
        </div>
        {/* Spacer matches sidebar width */}
        <div
          className="transition-all duration-300"
          style={{ width: sidebarCollapsed ? "5rem" : "16rem" }}
        />
      </div>

      {/* Mobile Nav */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          onMobileOpen={() => setMobileOpen(true)}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />
        <main className="flex-1 w-full p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}