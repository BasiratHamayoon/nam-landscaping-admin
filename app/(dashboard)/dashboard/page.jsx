"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { RecentContacts } from "@/components/dashboard/RecentContacts"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { fetchDashboardStats } from "@/store/slices/dashboardSlice"

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { counts, recentContacts, loading } = useSelector((state) => state.dashboard)
  const { admin } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, [dispatch])

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-1">
          Welcome back, <span className="italic text-primary-600 dark:text-primary-400">{admin?.name?.split(" ")[0] || "Admin"}</span>
        </h1>
        <p className="text-muted-foreground">Here's what's happening with your landscaping business today.</p>
      </div>

      <StatsGrid counts={counts} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentContacts contacts={recentContacts} loading={loading} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}