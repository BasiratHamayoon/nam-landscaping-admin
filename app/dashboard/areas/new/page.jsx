'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addArea } from '@/redux/slices/areaSlice';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Droplets,
  ShieldCheck,
  Plus,
  X,
  Upload
} from 'lucide-react';

export default function NewServiceAreaPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [emirate, setEmirate] = useState('Dubai');
  const [sectorCode, setSectorCode] = useState('');
  const [status, setStatus] = useState('Active Operations');
  const [activeContractsCount, setActiveContractsCount] = useState(1);
  const [waterPermitStatus, setWaterPermitStatus] = useState('DEWA Approved');
  const [avgProjectBudget, setAvgProjectBudget] = useState('AED 150,000');
  const [leadEngineersInput, setLeadEngineersInput] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const engineers = leadEngineersInput
      ? leadEngineersInput.split(',').map((s) => s.trim())
      : ['Eng. Tariq Al-Mansoor'];

    const newZone = {
      id: `ZONE-DXB-${Math.floor(10 + Math.random() * 90)}`,
      name,
      emirate,
      sectorCode: sectorCode || 'DXB-SEC-01',
      status,
      activeContractsCount: Number(activeContractsCount),
      leadEngineers: engineers,
      propertyTypes: ['Luxury Estates', 'Private Villas'],
      waterPermitStatus,
      avgProjectBudget,
      description,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1000&auto=format&fit=crop'
    };

    dispatch(addArea(newZone));
    router.push('/dashboard/areas');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/areas"
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-200 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#07190e]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Register New Dubai Service Zone
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Expand landscape coverage area and configure municipal water compliance permits.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Service Zone Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Nad Al Sheba Royal Villas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Sector / Postal Code
            </label>
            <input
              type="text"
              placeholder="e.g. NAS-ROYAL-SEC-04"
              value={sectorCode}
              onChange={(e) => setSectorCode(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Emirate Jurisdiction
            </label>
            <select
              value={emirate}
              onChange={(e) => setEmirate(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            >
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
            </select>
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
              Water Permit & Municipal Compliance
            </label>
            <input
              type="text"
              placeholder="e.g. DEWA & Greywater Certified"
              value={waterPermitStatus}
              onChange={(e) => setWaterPermitStatus(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Assigned Field Engineers (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Eng. Tariq Al-Mansoor, Youssef El-Hassan"
              value={leadEngineersInput}
              onChange={(e) => setLeadEngineersInput(e.target.value)}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Zone Cover Image URL
          </label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Zone Description & Features
          </label>
          <textarea
            rows={4}
            placeholder="Overview of soil quality, hydraulic infrastructure, estate types..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/dashboard/areas"
            className="px-5 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-medium text-white bg-[#07190e] hover:bg-[#11381e] rounded-xl transition-colors"
          >
            Save & Publish Zone
          </button>
        </div>
      </form>
    </div>
  );
}