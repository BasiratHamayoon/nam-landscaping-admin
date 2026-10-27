"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  Star,
  Mail,
  Settings,
  Leaf,
  FolderOpen,
  ChevronRight,
} from "lucide-react"
import gsap from "gsap"
import { cn } from "@/lib/cn"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/testimonials", label: "Testimonials", icon: Star },
  { href: "/contacts", label: "Inquiries", icon: Mail },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ collapsed, onMobileClose }) {
  const pathname = usePathname()
  const sidebarRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      })
    }, sidebarRef)
    return () => ctx.revert()
  }, [])

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "h-full bg-card border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo — shrink-0 prevents it from being squished */}
      <div
        className={cn(
          "flex items-center gap-3 px-5 py-5 border-b border-border shrink-0",
          collapsed && "justify-center px-0"
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-md shadow-primary-600/30">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-heading text-lg text-foreground leading-none truncate">
              NAM
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 font-semibold mt-0.5 truncate">
              Admin Panel
            </span>
          </div>
        )}
      </div>

      {/*
        KEY FIX: flex-1 + overflow-y-auto + min-h-0
        min-h-0 is CRITICAL — without it, flex children don't shrink
        below their content size, so overflow-y-auto never triggers.
      */}
      <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-gradient-to-r from-primary-600 to-emerald-700 text-white shadow-md shadow-primary-600/25"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : ""}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 shrink-0" />}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer — shrink-0 prevents squishing */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-border shrink-0">
          <div className="bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-primary-900/20 dark:to-emerald-900/20 rounded-xl p-3 border border-primary-100 dark:border-primary-900/30">
            <p className="text-xs font-semibold text-primary-700 dark:text-primary-400 mb-0.5">
              NAM Landscaping
            </p>
            <p className="text-[11px] text-muted-foreground">
              Admin v1.0
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}