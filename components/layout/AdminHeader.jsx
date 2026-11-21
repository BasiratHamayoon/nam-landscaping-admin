'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  Bell,
  Menu,
  ShieldCheck,
  LogOut,
  Settings,
  CheckCheck,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import { selectUser } from '@/redux/slices/authSlice';
import {
  selectDashboard,
  markAllNotificationsRead,
} from '@/redux/slices/dashboardSlice';
import { logoutAdmin } from '@/redux/actions/authActions';

export default function AdminHeader({ setMobileOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { notifications, recentOrders, recentInquiries } = useSelector(selectDashboard);

  const [query, setQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredOrders =
    query.trim().length > 1
      ? recentOrders.filter(
          (o) =>
            o.client.toLowerCase().includes(query.toLowerCase()) ||
            o.id.toLowerCase().includes(query.toLowerCase()) ||
            o.area.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const filteredLeads =
    query.trim().length > 1
      ? recentInquiries.filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.area.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleLogout = () => {
    dispatch(logoutAdmin());
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 h-20 bg-white/90 backdrop-blur-xl border-b border-emerald-950/5 px-6 sm:px-8 flex items-center justify-between gap-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Menu size={19} />
        </button>

        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick search villa orders (#ORD-9401), clients, or Dubai communities..."
            className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
          />

          <AnimatePresence>
            {query.trim().length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 space-y-3"
              >
                {filteredOrders.length === 0 && filteredLeads.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    No matching records found for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  <>
                    {filteredOrders.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                          Villa Projects &amp; Orders
                        </p>
                        {filteredOrders.map((o) => (
                          <button
                            key={o.id}
                            onClick={() => {
                              setQuery('');
                              router.push(`/dashboard/orders/${o.id}`);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-left transition-colors"
                          >
                            <div>
                              <p className="text-xs font-bold text-slate-900">
                                {o.client} <span className="text-emerald-700 font-mono">({o.id})</span>
                              </p>
                              <p className="text-[11px] text-slate-500">{o.area} • {o.service}</p>
                            </div>
                            <span className="text-xs font-bold text-slate-800">{o.amount}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {filteredLeads.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                          VIP Site Inquiries
                        </p>
                        {filteredLeads.map((l) => (
                          <button
                            key={l.id}
                            onClick={() => {
                              setQuery('');
                              router.push(`/dashboard/inquiries/${l.id}`);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-left transition-colors"
                          >
                            <div>
                              <p className="text-xs font-bold text-slate-900">{l.name}</p>
                              <p className="text-[11px] text-slate-500">{l.area} • {l.service}</p>
                            </div>
                            <ArrowUpRight size={14} className="text-emerald-700" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800 shadow-sm">
          <Sparkles size={13} className="text-emerald-600 animate-pulse" />
          <span>Dubai Nursery Inventory: Synced</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Live Operations Feed
                    </h4>
                    <p className="text-[11px] text-slate-400">Dispatch &amp; Project Updates</p>
                  </div>
                  <button
                    onClick={() => dispatch(markAllNotificationsRead())}
                    className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <CheckCheck size={13} /> Mark all read
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl border text-xs transition-colors ${
                        n.read
                          ? 'bg-slate-50/70 border-slate-100 text-slate-600'
                          : 'bg-emerald-50/80 border-emerald-200/70 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-7 w-px bg-slate-200" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#07190e] to-[#123920] text-emerald-300 border border-emerald-400/20 flex items-center justify-center font-bold text-xs shadow-sm">
              {user?.avatar || 'ML'}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                {user?.name || 'Tariq Al-Mansoor'}
                <ShieldCheck size={14} className="text-emerald-600" />
              </span>
              <span className="block text-[10px] text-slate-500 font-medium">
                {user?.role || 'Executive Director'}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50"
              >
                <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900">{user?.name || 'Tariq Al-Mansoor'}</p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.email || 'admin@themaplelandscaping.com'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    router.push('/dashboard/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Settings size={15} className="text-slate-500" />
                  <span>Command Settings</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors mt-1"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}