'use client';

import { Save, Shield, Bell, Store } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-playfair">System & Store Settings</h1>
        <p className="text-xs text-slate-500">Configure business parameters and security options</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b">
          <Store size={20} className="text-emerald-700" />
          <h2 className="font-bold text-slate-900 text-sm">Business Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Name</label>
            <input type="text" defaultValue="Royal Plantscape LLC" className="w-full px-3.5 py-2.5 border rounded-xl outline-none" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Support Email</label>
            <input type="email" defaultValue="support@royalplantscape.com" className="w-full px-3.5 py-2.5 border rounded-xl outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 pb-4 border-b">
          <Shield size={20} className="text-emerald-700" />
          <h2 className="font-bold text-slate-900 text-sm">Admin Password</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">New Password</label>
            <input type="password" placeholder="••••••••••••" className="w-full px-3.5 py-2.5 border rounded-xl outline-none" />
          </div>
        </div>

        <button type="button" className="px-6 py-3 bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2">
          <Save size={16} /> Save Settings
        </button>
      </div>
    </div>
  );
}