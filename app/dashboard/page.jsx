'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShoppingBag,
  Wrench,
  Users,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  selectDashboard,
  setTimeframe,
  markInquiryRead,
} from '@/redux/slices/dashboardSlice';

export default function ExecutiveDashboardPage() {
  const dispatch = useDispatch();
  const {
    timeframe,
    metricsByTimeframe,
    revenueChart,
    serviceBreakdown,
    recentOrders,
    recentInquiries,
  } = useSelector(selectDashboard);

  const [statusFilter, setStatusFilter] = useState('All');
  const currentMetrics = metricsByTimeframe[timeframe];

  const filteredOrders =
    statusFilter === 'All'
      ? recentOrders
      : recentOrders.filter((o) => o.status === statusFilter);

  const kpiCards = [
    {
      title: 'Gross Landscaping Revenue',
      value: currentMetrics.revenue,
      change: currentMetrics.revenueChange,
      sub: 'vs previous period',
      icon: TrendingUp,
      accent: 'from-emerald-600 to-teal-700',
      darkCard: true,
    },
    {
      title: 'Active Villa & Commercial Sites',
      value: currentMetrics.activeProjects,
      change: currentMetrics.projectsChange,
      sub: 'Across 18 Dubai communities',
      icon: Wrench,
    },
    {
      title: 'Plant Nursery & Store Sales',
      value: currentMetrics.storeOrders,
      change: currentMetrics.ordersChange,
      sub: 'Direct e-commerce orders',
      icon: ShoppingBag,
    },
    {
      title: 'Site Consultation Leads',
      value: currentMetrics.consultations,
      change: currentMetrics.consultationsChange,
      sub: 'High-intent villa inquiries',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700 mb-1">
            <Sparkles size={13} /> The Maple Executive Command Center
          </span>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Dubai Operations Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white p-1 rounded-xl border border-slate-200/90 flex items-center text-xs font-semibold shadow-sm">
            {[
              { key: 'week', label: '7 Days' },
              { key: 'month', label: '30 Days' },
              { key: 'year', label: 'Year to Date' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => dispatch(setTimeframe(t.key))}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  timeframe === t.key
                    ? 'bg-[#07190e] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Link
            href="/dashboard/products/new"
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5 transition-all hover:border-emerald-300"
          >
            <Plus size={15} /> Add Plant / Product
          </Link>

          <Link
            href="/dashboard/services/new"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-950/20 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <Plus size={15} /> New Service Offering
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={`rounded-2xl p-6 border transition-all ${
                card.darkCard
                  ? 'bg-gradient-to-br from-[#07190e] via-[#0d2d1a] to-[#07190e] text-white border-emerald-900 shadow-xl relative overflow-hidden'
                  : 'bg-white text-slate-900 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-md'
              }`}
            >
              {card.darkCard && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div className="flex items-center justify-between mb-4 relative z-10">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    card.darkCard ? 'text-emerald-300/80' : 'text-slate-400'
                  }`}
                >
                  {card.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    card.darkCard
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <Icon size={19} />
                </div>
              </div>

              <p
                className="text-2xl sm:text-3xl font-bold tracking-tight relative z-10"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {card.value}
              </p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-current/10 text-xs relative z-10">
                <span
                  className={`inline-flex items-center gap-1 font-bold ${
                    card.darkCard ? 'text-emerald-300' : 'text-emerald-600'
                  }`}
                >
                  <ArrowUpRight size={14} /> {card.change}
                </span>
                <span className={card.darkCard ? 'text-emerald-100/60' : 'text-slate-400'}>
                  {card.sub}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="xl:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2
                className="text-lg font-bold text-slate-900"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Revenue Trajectory vs Target (AED)
              </h2>
              <p className="text-xs text-slate-500">
                Monthly landscaping design-build contracts + online nursery retail
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Actual Revenue
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Target Projections
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart}>
                <defs>
                  <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#07190e',
                    color: '#fff',
                    borderRadius: '14px',
                    border: '1px solid rgba(16,185,129,0.2)',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="none"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#emeraldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between"
        >
          <div>
            <h2
              className="text-lg font-bold text-slate-900 mb-1"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Revenue by Division
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Core revenue contribution across The Maple service departments
            </p>

            <div className="space-y-4">
              {serviceBreakdown.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <span className="font-bold text-slate-900">
                      {item.amount}{' '}
                      <span className="text-emerald-600 font-semibold">({item.share}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.share}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Primary High-Value Hub:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <MapPin size={13} /> Palm Jumeirah &amp; Dubai Hills
            </span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2
                className="text-lg font-bold text-slate-900"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Recent Villa Projects &amp; Retail Orders
              </h2>
              <p className="text-xs text-slate-500">
                Track ongoing execution status, invoices, and milestones
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl text-xs font-semibold">
              {['All', 'In Progress', 'Completed', 'Pending'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === st
                      ? 'bg-white text-slate-900 shadow-sm font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 pl-6">Ref ID</th>
                  <th className="p-4">Client &amp; Community</th>
                  <th className="p-4">Scope of Work</th>
                  <th className="p-4">Contract Value</th>
                  <th className="p-4 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-emerald-50/40 transition-colors group"
                  >
                    <td className="p-4 pl-6 font-mono font-bold text-emerald-700">
                      <Link href={`/dashboard/orders/${order.id}`} className="hover:underline">
                        #{order.id}
                      </Link>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{order.client}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-emerald-600" /> {order.area}
                      </p>
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">{order.service}</td>
                    <td className="p-4 font-bold text-slate-900">{order.amount}</td>
                    <td className="p-4 pr-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status === 'Completed' && <CheckCircle2 size={12} />}
                        {order.status === 'In Progress' && <Clock size={12} />}
                        {order.status === 'Pending' && <AlertCircle size={12} />}
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className="text-lg font-bold text-slate-900"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  VIP Consultation Feed
                </h2>
                <p className="text-xs text-slate-500">Direct villa site visit requests</p>
              </div>
              <Link
                href="/dashboard/inquiries"
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentInquiries.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => dispatch(markInquiryRead(lead.id))}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    lead.unread
                      ? 'bg-emerald-50/60 border-emerald-300/80 shadow-sm'
                      : 'bg-slate-50/70 border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        {lead.name}
                        {lead.unread && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        )}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {lead.area}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-800 shadow-sm">
                      {lead.budget}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-2.5">{lead.service}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60">
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <Phone size={11} className="text-emerald-600" /> {lead.phone}
                    </span>
                    <span>{lead.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/inquiries"
            className="mt-5 w-full py-3 rounded-xl bg-[#07190e] hover:bg-emerald-950 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <span>Open Lead Management Center</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}