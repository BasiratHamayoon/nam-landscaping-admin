'use client';

import Link from 'next/link';
import { Plus, MapPin, Edit2 } from 'lucide-react';

const areas = ['Mirdif', 'Jumeirah', 'Palm Jumeirah', 'Arabian Ranches', 'Dubai Hills'];

export default function AreasListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-playfair">Areas We Serve</h1>
          <p className="text-xs text-slate-500">Manage Dubai coverage zones and landing pages</p>
        </div>
        <Link href="/dashboard/areas/new" className="px-4 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2">
          <Plus size={16} /> Add New Area
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {areas.map((a) => (
          <div key={a} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-emerald-600" />
              <span className="font-semibold text-xs text-slate-900">{a}</span>
            </div>
            <Link href={`/dashboard/areas/${a.toLowerCase().replace(/\s+/g, '-')}`} className="text-slate-400 hover:text-emerald-700">
              <Edit2 size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}