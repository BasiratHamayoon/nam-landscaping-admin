'use client';

import Link from 'next/link';
import { MessageSquare, ArrowRight } from 'lucide-react';

const inquiries = [
  { id: 'inq-101', name: 'Khalid Al-Mansoor', service: 'Villa Landscaping', area: 'Jumeirah 2', date: 'Today, 10:15 AM' },
  { id: 'inq-102', name: 'Elena Rostova', service: 'Indoor Plant Care', area: 'Palm Jumeirah', date: 'Yesterday' },
];

export default function InquiriesListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-playfair">Consultation Leads & Messages</h1>
        <p className="text-xs text-slate-500">Client form submissions from the public website</p>
      </div>

      <div className="space-y-3">
        {inquiries.map((iq) => (
          <div key={iq.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs">{iq.name}</h3>
                <p className="text-xs text-slate-500">{iq.service} • {iq.area}</p>
              </div>
            </div>
            <Link href={`/dashboard/inquiries/${iq.id}`} className="px-3.5 py-2 bg-slate-50 hover:bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors">
              View Inquiry <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}