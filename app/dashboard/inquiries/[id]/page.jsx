'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

export default function InquiryDetailPage({ params }) {
  const { id } = use(params);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/inquiries" className="p-2 rounded-xl bg-white border border-slate-200">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-playfair">Lead #{id}</h1>
          <p className="text-xs text-slate-500">Khalid Al-Mansoor • Jumeirah 2</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 text-xs">
        <div>
          <p className="font-bold text-slate-900 mb-1">Message Content:</p>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
            &ldquo;Looking for a complete makeover for our 5-bedroom villa garden in Jumeirah 2, including swimming pool landscaping and synthetic turf.&rdquo;
          </p>
        </div>

        <div className="pt-4 border-t space-y-3">
          <p className="font-bold text-slate-900">Send Direct Response:</p>
          <textarea rows={3} placeholder="Write email response..." className="w-full p-3 border rounded-xl outline-none resize-none" />
          <button type="button" className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl font-semibold flex items-center gap-2">
            <Send size={14} /> Send Reply Email
          </button>
        </div>
      </div>
    </div>
  );
}