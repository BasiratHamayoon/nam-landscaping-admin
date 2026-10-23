"use client"

import { Menu, PanelLeft, Bell, Search } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { UserMenu } from "./UserMenu"

export function Header({ onMobileOpen, onToggleSidebar, collapsed }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileOpen}
          className="lg:hidden p-2 rounded-full hover:bg-muted text-muted-foreground cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 rounded-full hover:bg-muted text-muted-foreground cursor-pointer"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-2 bg-muted rounded-full px-4 py-2 w-72">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}