"use client"

import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  TrendingUp,
  Calendar,
  Sparkles,
  Hand,
  RefreshCw,
  Activity,
} from "lucide-react"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { RecentContacts } from "@/components/dashboard/RecentContacts"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { PerformanceCard } from "@/components/dashboard/PerformanceCard"
import {
  fetchDashboardStats,
  invalidateDashboard,
} from "@/store/slices/dashboardSlice"

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { counts, recentContacts, loading } = useSelector(
    (state) => state.dashboard
  )
  const { admin } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(invalidateDashboard())
    dispatch(fetchDashboardStats())
  }

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  )

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }, [])

  const totalContent = useMemo(() => {
    return (
      (counts?.services || 0) +
      (counts?.projects || 0) +
      (counts?.gallery || 0) +
      (counts?.testimonials || 0)
    )
  }, [counts])

  return (
    <div className="space-y-6 w-full">
      {/* ===================== HERO BANNER ===================== */}
      <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-primary-700 via-emerald-800 to-primary-900 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-emerald-400/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-primary-300/20 blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute top-6 right-6 opacity-10">
          <Sparkles className="w-24 h-24 md:w-32 md:h-32" />
        </div>

        <div className="relative z-10 p-5 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              <Calendar className="w-3.5 h-3.5" />
              {today}
            </div>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 text-[11px] font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl lg:text-5xl mb-3 flex items-center flex-wrap gap-x-3 gap-y-1">
            <Hand className="w-7 h-7 md:w-9 md:h-9 text-amber-300 inline-block -rotate-12" />
            <span>
              {greeting},{" "}
              <span className="italic text-emerald-200">
                {admin?.name?.split(" ")[0] || "Admin"}
              </span>
            </span>
          </h1>

          <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed">
            Monitor your content, track leads, and manage everything from one
            place.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-medium bg-emerald-500/20 backdrop-blur-sm px-3 py-2 rounded-full border border-emerald-300/30">
              <Activity className="w-3.5 h-3.5 text-emerald-200" />
              <span className="text-emerald-50">Real-time dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{totalContent} total content items</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== STATS GRID ===================== */}
      <StatsGrid counts={counts} loading={loading} />

      {/* ===================== PERFORMANCE STRIP ===================== */}
      <PerformanceCard counts={counts} />

      {/* ===================== TWO-COLUMN GRID ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0">
          <RecentContacts contacts={recentContacts} loading={loading} />
        </div>
        <div className="min-w-0">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}