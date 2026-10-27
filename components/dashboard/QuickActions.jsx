"use client"

import Link from "next/link"
import {
  Plus,
  Briefcase,
  FolderOpen,
  Image as ImageIcon,
  Star,
  Rocket,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card"

const actions = [
  {
    href: "/services",
    label: "Add Service",
    icon: Briefcase,
    color: "hover:bg-emerald-600",
  },
  {
    href: "/projects",
    label: "Add Project",
    icon: FolderOpen,
    color: "hover:bg-blue-600",
  },
  {
    href: "/gallery",
    label: "Upload Image",
    icon: ImageIcon,
    color: "hover:bg-purple-600",
  },
  {
    href: "/testimonials",
    label: "Add Review",
    icon: Star,
    color: "hover:bg-amber-600",
  },
]

export function QuickActions() {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="flex items-center gap-3 flex-row border-b border-border bg-gradient-to-r from-primary-50/50 to-transparent dark:from-primary-900/10">
        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
          <Rocket className="w-5 h-5" />
        </div>
        <div>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Shortcuts to add new content</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3 p-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-muted hover:text-white group transition-all duration-300 overflow-hidden ${action.color}`}
            >
              <div className="w-11 h-11 rounded-xl bg-card group-hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center">
                {action.label}
              </span>
              <div className="flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider opacity-70">
                <Plus className="w-3 h-3" />
                New
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}