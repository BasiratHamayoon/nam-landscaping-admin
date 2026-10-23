"use client"

import Link from "next/link"
import { Plus, Briefcase, FolderOpen, Image as ImageIcon, Star } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"

const actions = [
  { href: "/services", label: "Add Service", icon: Briefcase },
  { href: "/projects", label: "Add Project", icon: FolderOpen },
  { href: "/gallery", label: "Upload Gallery", icon: ImageIcon },
  { href: "/testimonials", label: "Add Review", icon: Star },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Shortcuts to add new content</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted hover:bg-primary-600 hover:text-white group transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-card group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">{action.label}</span>
              <Plus className="w-3 h-3 opacity-70" />
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}