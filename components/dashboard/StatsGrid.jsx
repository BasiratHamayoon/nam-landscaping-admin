"use client"

import { useEffect, useRef } from "react"
import {
  Briefcase,
  FolderOpen,
  Image as ImageIcon,
  Star,
  Mail,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { Card } from "@/components/ui/Card"

export function StatsGrid({ counts, loading }) {
  const gridRef = useRef(null)

  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      })
      gsap.utils.toArray(".stat-value").forEach((el) => {
        const target = parseInt(el.dataset.value) || 0
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.2,
            snap: { innerText: 1 },
            ease: "power2.out",
          }
        )
      })
    }, gridRef)
    return () => ctx.revert()
  }, [loading, counts])

  const stats = [
    {
      label: "Services",
      value: counts?.services || 0,
      icon: Briefcase,
      href: "/services",
      gradient: "from-emerald-500 to-emerald-700",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
      iconText: "text-emerald-600 dark:text-emerald-400",
      ring: "ring-emerald-500/20",
    },
    {
      label: "Projects",
      value: counts?.projects || 0,
      icon: FolderOpen,
      href: "/projects",
      gradient: "from-blue-500 to-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      iconText: "text-blue-600 dark:text-blue-400",
      ring: "ring-blue-500/20",
    },
    {
      label: "Gallery",
      value: counts?.gallery || 0,
      icon: ImageIcon,
      href: "/gallery",
      gradient: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-900/40",
      iconText: "text-purple-600 dark:text-purple-400",
      ring: "ring-purple-500/20",
    },
    {
      label: "Testimonials",
      value: counts?.testimonials || 0,
      icon: Star,
      href: "/testimonials",
      gradient: "from-amber-500 to-amber-700",
      iconBg: "bg-amber-100 dark:bg-amber-900/40",
      iconText: "text-amber-600 dark:text-amber-400",
      ring: "ring-amber-500/20",
    },
    {
      label: "Inquiries",
      value: counts?.contacts || 0,
      icon: Mail,
      href: "/contacts",
      gradient: "from-rose-500 to-rose-700",
      iconBg: "bg-rose-100 dark:bg-rose-900/40",
      iconText: "text-rose-600 dark:text-rose-400",
      ring: "ring-rose-500/20",
    },
  ]

  return (
    <div ref={gridRef} className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href} className="min-w-0">
              <Card
                className={`stat-card group relative p-4 md:p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-border hover:ring-2 ${stat.ring} h-full`}
              >
                <div
                  className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                />

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${stat.iconBg} ${stat.iconText} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <p className="text-[11px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 relative z-10">
                  {stat.label}
                </p>
                <h3
                  className="text-2xl md:text-3xl font-bold text-foreground stat-value relative z-10"
                  data-value={stat.value}
                >
                  {stat.value}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-[10px] md:text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold relative z-10">
                  <TrendingUp className="w-3 h-3" />
                  <span>Active</span>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}