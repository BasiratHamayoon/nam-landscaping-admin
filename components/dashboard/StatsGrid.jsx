"use client"

import { useEffect, useRef } from "react"
import { Briefcase, FolderOpen, Image as ImageIcon, Star, Mail } from "lucide-react"
import gsap from "gsap"
import { Card } from "@/components/ui/Card"

export function StatsGrid({ counts, loading }) {
  const gridRef = useRef(null)

  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      })
      gsap.utils.toArray(".stat-value").forEach((el) => {
        const target = parseInt(el.dataset.value) || 0
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target, duration: 1.5, snap: { innerText: 1 }, ease: "power2.out",
        })
      })
    }, gridRef)
    return () => ctx.revert()
  }, [loading, counts])

  const stats = [
    { label: "Services", value: counts?.services || 0, icon: Briefcase, color: "from-emerald-500 to-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
    { label: "Projects", value: counts?.projects || 0, icon: FolderOpen, color: "from-blue-500 to-blue-700", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
    { label: "Gallery", value: counts?.gallery || 0, icon: ImageIcon, color: "from-purple-500 to-purple-700", bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
    { label: "Testimonials", value: counts?.testimonials || 0, icon: Star, color: "from-amber-500 to-amber-700", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
    { label: "Inquiries", value: counts?.contacts || 0, icon: Mail, color: "from-rose-500 to-rose-700", bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400" },
  ]

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="stat-card p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.text} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <h3 className="text-3xl font-bold text-foreground stat-value" data-value={stat.value}>
              {stat.value}
            </h3>
          </Card>
        )
      })}
    </div>
  )
}