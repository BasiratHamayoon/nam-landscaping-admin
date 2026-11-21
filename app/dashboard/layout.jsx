'use client';

import { useState, Suspense } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';

function SidebarFallback() {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-72 bg-[#07190e] border-r border-emerald-950/80 z-[100] hidden lg:block" />
  );
}

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7f5] flex text-slate-800 font-sans">
      <Suspense fallback={<SidebarFallback />}>
        <AdminSidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </Suspense>

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:pl-[84px]' : 'lg:pl-72'
        }`}
      >
        <AdminHeader setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}