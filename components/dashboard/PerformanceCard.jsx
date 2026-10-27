"use client"

import { useMemo } from "react"
import { Target, Zap } from "lucide-react"
import { Card } from "@/components/ui/Card"

export function PerformanceCard({ counts }) {
  const items = useMemo(() => {
    const total =
      (counts?.services || 0) +
      (counts?.projects || 0) +
      (counts?.gallery || 0) +
      (counts?.testimonials || 0) || 1

    return [
      {
        label: "Services",
        value: counts?.services || 0,
        pct: ((counts?.services || 0) / total) * 100,
        color: "bg-emerald-500",
      },
      {
        label: "Projects",
        value: counts?.projects || 0,
        pct: ((counts?.projects || 0) / total) * 100,
        color: "bg-blue-500",
      },
      {
        label: "Gallery",
        value: counts?.gallery || 0,
        pct: ((counts?.gallery || 0) / total) * 100,
        color: "bg-purple-500",
      },
      {
        label: "Testimonials",
        value: counts?.testimonials || 0,
        pct: ((counts?.testimonials || 0) / total) * 100,
        color: "bg-amber-500",
      },
    ]
  }, [counts])

  return (
    <Card className="p-5 md:p-6">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg text-foreground">
              Content Distribution
            </h3>
            <p className="text-xs text-muted-foreground">
              Breakdown of your published content types
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5" />
          Live
        </div>
      </div>

      {/* Combined progress bar */}
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex mb-5">
        {items.map((item) => (
          <div
            key={item.label}
            className={`${item.color} h-full transition-all duration-700`}
            style={{ width: `${item.pct}%` }}
            title={`${item.label}: ${item.value}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-sm ${item.color} shrink-0`} />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground truncate">
                {item.label}
              </p>
              <p className="text-sm font-bold text-foreground">
                {item.value}
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  ({item.pct.toFixed(0)}%)
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}