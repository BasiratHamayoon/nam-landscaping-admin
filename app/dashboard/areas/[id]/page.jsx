'use client';

import { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectAreas, updateArea, deleteArea } from '@/redux/slices/areaSlice';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Save,
  AlertCircle,
  Users
} from 'lucide-react';

function AreaDetailContent() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const zoneId = params?.id;

  const areas = useSelector(selectAreas) || [];
  const area = areas.find((a) => a.id === zoneId);

  const [name, setName] = useState(area?.name || '');
  const [sectorCode, setSectorCode] = useState(area?.sectorCode || '');
  const [status, setStatus] = useState(area?.status || 'Active Operations');
  const [activeContractsCount, setActiveContractsCount] = useState(area?.activeContractsCount || 0);
  const [waterPermitStatus, setWaterPermitStatus] = useState(area?.waterPermitStatus || '');
  const [leadEngineersInput, setLeadEngineersInput] = useState(area?.leadEngineers?.join(', ') || '');
  const [description, setDescription] = useState(area?.description || '');

  if (!area) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-xl mx-auto my-12 shadow-sm space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Service Zone Not Found
        </h2>
        <p className="text-sm text-gray-500">
          The requested service zone ID <span className="font-mono text-gray-800">{zoneId}</span> does not exist.
        </p>
        <Link
          href="/dashboard/areas"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#07190e] text-white text-xs font-semibold rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Service Zones
        </Link>
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    const engineers = leadEngineersInput
      ? leadEngineersInput.split(',').map((s) => s.trim())
      : [];

    dispatch(
      updateArea({
        id: area.id,
        name,
        sectorCode,
        status,
        activeContractsCount: Number(activeContractsCount),
        waterPermitStatus,
        leadEngineers: engineers,
        description
      })
    );

    router.push('/dashboard/areas');
  };

  const handleDelete = () => {
    dispatch(deleteArea(area.id));
    router.push('/dashboard/areas');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/areas"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-200 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-[#07190e] text-white px-2 py-0.5 rounded">
                {area.id}
              </span>
              <span className="text-xs text-gray-500 font-semibold">{area.emirate}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#07190e] mt-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {area.name}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Delete Zone
        </button>
      </div>

      <form onSubmit={handleUpdate} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Zone Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Sector Code
            </label>
            <input
              type="text"
              value={sectorCode}
              onChange={(e) => setSectorCode(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Operational Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            >
              <option value="Active Operations">Active Operations</option>
              <option value="Limited Coverage">Limited Coverage</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Active Serviced Properties
            </label>
            <input
              type="number"
              value={activeContractsCount}
              onChange={(e) => setActiveContractsCount(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Water Permit & Municipal Compliance
            </label>
            <input
              type="text"
              value={waterPermitStatus}
              onChange={(e) => setWaterPermitStatus(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Lead Engineers (Comma Separated)
            </label>
            <input
              type="text"
              value={leadEngineersInput}
              onChange={(e) => setLeadEngineersInput(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Zone Overview & Features
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/dashboard/areas"
            className="px-5 py-2.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-xl"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium text-white bg-[#07190e] hover:bg-[#11381e] rounded-xl transition-colors"
          >
            <Save className="w-4 h-4" /> Save Zone Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AreaDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500 font-medium">Loading zone details...</div>}>
      <AreaDetailContent />
    </Suspense>
  );
}