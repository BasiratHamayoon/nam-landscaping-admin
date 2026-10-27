"use client"

import { Menu, PanelLeft, Bell, Search } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { UserMenu } from "./UserMenu"

export function Header({ onMobileOpen, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-6 gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMobileOpen}
          className="lg:hidden p-2 rounded-full hover:bg-muted text-muted-foreground cursor-pointer shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 rounded-full hover:bg-muted text-muted-foreground cursor-pointer shrink-0"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-2 bg-muted rounded-full px-4 py-2 max-w-xs flex-1">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <button className="relative w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-card" />
        </button>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}