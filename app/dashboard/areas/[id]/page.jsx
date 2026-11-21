'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditAreaPage({ params }) {
  const { id } = use(params);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/areas" className="p-2 rounded-xl bg-white border border-slate-200">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 font-playfair capitalize">Edit Area: {id}</h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-2xl p-6 border space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Community Name</label>
          <input type="text" defaultValue={id} className="w-full px-3.5 py-2.5 border rounded-xl text-xs outline-none capitalize" />
        </div>
        <button type="submit" className="px-6 py-3 bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </form>
    </div>
  );
}