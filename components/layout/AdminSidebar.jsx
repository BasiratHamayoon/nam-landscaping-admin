'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Wrench,
  FileText,
  MapPin,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { logoutAdmin } from '@/redux/actions/authActions';
import { selectUser } from '@/redux/slices/authSlice';
import MapleLogo from '@/components/MapleLogo';

const navLinks = [
  { name: 'Executive Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Plant & Nursery Catalog', href: '/dashboard/products', icon: ShoppingBag, badge: '48' },
  { name: 'Landscaping Services', href: '/dashboard/services', icon: Wrench },
  { name: 'Contracts & Projects', href: '/dashboard/orders', icon: FileText, badge: '5' },
  { name: 'VIP Consultation Leads', href: '/dashboard/inquiries', icon: MessageSquare, badge: '2 New', highlight: true },
  { name: 'Dubai Service Zones', href: '/dashboard/areas', icon: MapPin },
  { name: 'Control Settings', href: '/dashboard/settings', icon: Settings },
];

export default function AdminSidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    router.push('/login');
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 bottom-0 z-[100] bg-[#07190e] text-white border-r border-emerald-950/80 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
          collapsed ? 'lg:w-[84px]' : 'lg:w-72'
        } ${mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Logo Brand Header */}
          <div className="h-20 px-5 flex items-center justify-between border-b border-white/10 bg-[#06140b]">
            <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <MapleLogo variant="iconOnly" size={26} className="text-emerald-400" />
              </div>

              {!collapsed && (
                <div className="leading-tight whitespace-nowrap">
                  <span
                    className="block text-[13.5px] font-bold tracking-wider text-white uppercase"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    The Maple
                  </span>
                  <span className="block text-[9px] font-semibold text-emerald-400 uppercase tracking-[0.24em]">
                    Enterprise Suite
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3.5 space-y-1.5">
            {!collapsed && (
              <div className="flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/60">
                <span>Management Hub</span>
                <Sparkles size={11} className="text-emerald-500/50" />
              </div>
            )}

            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.name : undefined}
                  className={`relative flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'text-white bg-emerald-500/20 border border-emerald-400/40 shadow-sm shadow-emerald-950 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                          : 'text-slate-400 group-hover:text-emerald-300'
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.highlight
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="p-3.5 border-t border-white/10 space-y-2 bg-[#05130a] relative z-10">
          {!collapsed && user && (
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 border border-emerald-400/30 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                {user.avatar || 'ML'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{user.name || 'Admin Director'}</p>
                <p className="text-[10px] text-emerald-400 font-medium truncate">The Maple Landscaping</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? 'Sign Out' : undefined}
            className="w-full flex items-center justify-center lg:justify-start gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all"
          >
            <LogOut size={17} className="shrink-0" />
            {!collapsed && <span>Sign Out of Portal</span>}
          </button>
        </div>
      </aside>
    </>
  );
}