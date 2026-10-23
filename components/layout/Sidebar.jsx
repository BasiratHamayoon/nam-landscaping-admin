"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Briefcase, Image as ImageIcon, Star, Mail, Settings, Leaf, FolderOpen, ChevronRight,
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
        x: -20, opacity: 0, duration: 0.4, stagger: 0.05, ease: "power2.out",
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
      <div className={cn("flex items-center gap-3 p-6 border-b border-border", collapsed && "justify-center")}>
        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shrink-0 shadow-md shadow-primary-600/30">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-heading text-lg text-foreground leading-none">NAM</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 font-semibold mt-0.5">
              Admin Panel
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : ""}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary-700 dark:text-primary-400 mb-1">
              NAM Landscaping
            </p>
            <p className="text-xs text-muted-foreground">
              Admin v1.0 © 2024
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}