'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAreas,
  selectAreaFilters,
  setSearchQuery,
  setStatusFilter,
  resetFilters,
  deleteArea
} from '@/redux/slices/areaSlice';
import {
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Trash2,
  Edit3,
  Eye,
  Download,
  RefreshCw,
  Droplets,
  Users,
  Award,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function ServiceAreasPage() {
  const dispatch = useDispatch();
  const areas = useSelector(selectAreas) || [];
  const filters = useSelector(selectAreaFilters) || { search: '', status: 'all' };

  const [viewMode, setViewMode] = useState('grid');
  const [deleteId, setDeleteId] = useState(null);

  const filteredAreas = useMemo(() => {
    return areas.filter((area) => {
      const query = filters.search.toLowerCase();
      const matchesSearch =
        area.name.toLowerCase().includes(query) ||
        area.id.toLowerCase().includes(query) ||
        area.sectorCode.toLowerCase().includes(query) ||
        area.description.toLowerCase().includes(query);

      const matchesStatus =
        filters.status === 'all' || area.status.toLowerCase() === filters.status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [areas, filters]);

  const kpis = useMemo(() => {
    const totalZones = areas.length;
    const activeZones = areas.filter((a) => a.status === 'Active Operations').length;
    const totalContracts = areas.reduce((sum, a) => sum + (a.activeContractsCount || 0), 0);
    return { totalZones, activeZones, totalContracts };
  }, [areas]);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      dispatch(deleteArea(deleteId));
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active Operations':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Operations
          </span>
        );
      case 'Limited Coverage':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" /> Limited Coverage
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#07190e]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Service Zones & Areas We Serve
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage operational Dubai sectors, engineer assignments, and municipal water permits.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/areas/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#07190e] text-white hover:bg-[#11381e] font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Service Zone
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Coverage Zones</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.totalZones} Sectors</h3>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-1 font-medium">
              <MapPin className="w-3 h-3" /> Across Dubai & Emirates
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Active Operational Teams</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.activeZones} Active</h3>
            <span className="inline-flex items-center gap-1 text-xs text-blue-600 mt-1 font-medium">
              <Users className="w-3 h-3" /> Dedicated Site Engineers
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Serviced Estates & Projects</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.totalContracts} Properties</h3>
            <span className="inline-flex items-center gap-1 text-xs text-amber-600 mt-1 font-medium">
              <Award className="w-3 h-3" /> Active Maintenance Contracts
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-lg">
            <button
              onClick={() => dispatch(setStatusFilter('all'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.status === 'all'
                  ? 'bg-white text-[#07190e] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => dispatch(setStatusFilter('Active Operations'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.status === 'Active Operations'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Active Operations
            </button>
            <button
              onClick={() => dispatch(setStatusFilter('Limited Coverage'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.status === 'Limited Coverage'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Limited Coverage
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1.5 rounded text-xs font-medium border ${
                viewMode === 'grid' ? 'bg-[#07190e] text-white border-[#07190e]' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Grid Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded text-xs font-medium border ${
                viewMode === 'table' ? 'bg-[#07190e] text-white border-[#07190e]' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Table
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-10 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search zone name, sector code, or description..."
              value={filters.search}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07190e] bg-gray-50/50"
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <button
              onClick={() => dispatch(resetFilters())}
              className="w-full py-2 px-2 text-xs font-semibold text-gray-600 hover:text-rose-600 border border-gray-200 hover:border-rose-200 rounded-lg bg-white flex items-center justify-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {filteredAreas.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">No service zones found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search criteria.</p>
          <button
            onClick={() => dispatch(resetFilters())}
            className="mt-4 px-4 py-2 bg-[#07190e] text-white text-xs font-medium rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area) => (
            <div key={area.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                  {area.coverImage ? (
                    <img src={area.coverImage} alt={area.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <MapPin className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-xs font-bold bg-[#07190e]/90 text-white px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {area.sectorCode}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(area.status)}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                      {area.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{area.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Active Estates:</span>
                      <span className="font-bold text-[#07190e]">{area.activeContractsCount} Properties</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Water Compliance:</span>
                      <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] line-clamp-1">
                        {area.waterPermitStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-gray-500">Lead Engineers:</span>
                      <span className="font-medium text-gray-800 line-clamp-1">
                        {area.leadEngineers?.join(', ') || 'Unassigned'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDeleteId(area.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Zone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href={`/dashboard/areas/${area.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#07190e] text-white text-xs font-semibold rounded-lg hover:bg-[#11381e] transition-colors"
                >
                  Manage Zone <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-4">Sector / Zone Name</th>
                  <th className="py-3.5 px-4">Emirate</th>
                  <th className="py-3.5 px-4">Active Projects</th>
                  <th className="py-3.5 px-4">Assigned Engineers</th>
                  <th className="py-3.5 px-4">Water Compliance</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredAreas.map((area) => (
                  <tr key={area.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-xs font-bold text-[#07190e]">{area.sectorCode}</div>
                      <div className="font-semibold text-gray-900 text-xs mt-0.5">{area.name}</div>
                    </td>

                    <td className="py-3.5 px-4 text-xs font-medium text-gray-700">
                      {area.emirate}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-xs text-gray-900">
                      {area.activeContractsCount} Estates
                    </td>

                    <td className="py-3.5 px-4 text-xs text-gray-600 max-w-xs">
                      {area.leadEngineers?.join(', ') || 'Unassigned'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <Droplets className="w-3 h-3 text-emerald-600" /> {area.waterPermitStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(area.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/dashboard/areas/${area.id}`}
                          className="p-1.5 text-gray-600 hover:text-[#07190e] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(area.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Delete Service Zone?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to remove <span className="font-mono font-bold text-gray-800">{deleteId}</span>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
              >
                Delete Zone
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}