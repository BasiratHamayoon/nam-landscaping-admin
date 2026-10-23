"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"
import { fetchMe } from "@/store/slices/authSlice"
import { Loader2 } from "lucide-react"

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
        router.push("/login")
      }
      setChecking(false)
    }
    verify()
  }, [dispatch, router])

  if (checking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen w-full flex bg-background">
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMobileOpen={() => setMobileOpen(true)}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}