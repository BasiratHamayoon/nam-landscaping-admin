'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  Search,
  Plus,
  Filter,
  Grid,
  List,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Layers,
  Sparkles,
  Clock,
  ShieldCheck
} from 'lucide-react';
import {
  selectServices,
  selectServiceFilters,
  setServiceSearchQuery,
  setSelectedDivision,
  setSelectedServiceStatus,
  setServiceViewMode,
  deleteService,
  toggleServiceStatus
} from '@/redux/slices/serviceSlice';

export default function ServicesPage() {
  const dispatch = useDispatch();
  const servicesState = useSelector(selectServices);
  const filters = useSelector(selectServiceFilters);

  const subServices = Array.isArray(servicesState)
    ? servicesState
    : servicesState?.subServices || [];
  const pillars = servicesState?.pillars || [];

  const [deleteModalId, setDeleteModalId] = useState(null);

  const getPillarTitle = (pillarId) => {
    const pillar = pillars.find((p) => p.id === pillarId);
    return pillar ? pillar.title : 'General Landscaping';
  };

  const pillarTitles = ['All', ...pillars.map((p) => p.title)];

  const searchQuery = filters?.searchQuery || '';
  const selectedDivision = filters?.selectedDivision || 'All';
  const selectedStatus = filters?.selectedStatus || 'All';
  const viewMode = filters?.viewMode || 'grid';

  const filteredServices = subServices.filter((service) => {
    const servicePillarTitle = getPillarTitle(service.pillarId);
    const matchesSearch =
      service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDivision =
      selectedDivision === 'All' || servicePillarTitle === selectedDivision;
    
    const matchesStatus =
      selectedStatus === 'All' || service.status === selectedStatus;

    return matchesSearch && matchesDivision && matchesStatus;
  });

  const handleDeleteConfirm = () => {
    if (deleteModalId) {
      dispatch(deleteService(deleteModalId));
      setDeleteModalId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-[#07190e]">
            Service Offerings & Packages
          </h1>
          <p className="text-sm text-[#07190e]/60 mt-1">
            Manage architectural hardscaping, softscaping, and turnkey commercial landscaping packages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/services/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#07190e] text-white hover:bg-[#07190e]/90 font-medium text-sm transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Service Package
          </Link>
        </div>
      </div>

      {/* Primary Pillars Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif font-medium text-[#07190e]">
          Primary Service Pillars ({pillars.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl border border-[#07190e]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="h-36 relative overflow-hidden bg-[#07190e]/5">
                {pillar.image ? (
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#07190e]/20">
                    <Layers className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-medium bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/30">
                  {subServices.filter((s) => s.pillarId === pillar.id).length} Packages
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#07190e]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#07190e]/60 line-clamp-2 mt-1">
                    {pillar.tagline || pillar.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#07190e]/5 text-xs">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {pillar.status || 'Active'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#07190e]/10 p-4 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#07190e]/40" />
            <input
              type="text"
              placeholder="Search service offerings by keyword, warranty, or scope..."
              value={searchQuery}
              onChange={(e) => dispatch(setServiceSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#07190e]/50" />
              <select
                value={selectedDivision}
                onChange={(e) => dispatch(setSelectedDivision(e.target.value))}
                className="px-3 py-2 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-xs font-medium text-[#07190e] bg-white"
              >
                {pillarTitles.map((title) => (
                  <option key={title} value={title}>
                    Pillar: {title}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => dispatch(setSelectedServiceStatus(e.target.value))}
              className="px-3 py-2 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-xs font-medium text-[#07190e] bg-white"
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Draft">Draft</option>
            </select>

            <div className="flex items-center rounded-xl border border-[#07190e]/15 p-0.5 bg-[#07190e]/[0.02]">
              <button
                type="button"
                onClick={() => dispatch(setServiceViewMode('grid'))}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#07190e] text-white'
                    : 'text-[#07190e]/60 hover:text-[#07190e]'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => dispatch(setServiceViewMode('list'))}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#07190e] text-white'
                    : 'text-[#07190e]/60 hover:text-[#07190e]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Content Section */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#07190e]/10 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#07190e]/5 text-[#07190e]/40 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif font-medium text-[#07190e]">No Services Found</h3>
          <p className="text-sm text-[#07190e]/60 max-w-md mx-auto">
            No service offerings match your current search query or pillar filters. Try clearing your filters.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#07190e]/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden bg-[#07190e]/5">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#07190e]/20">
                      <Sparkles className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-[#07190e]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {getPillarTitle(service.pillarId)}
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(toggleServiceStatus(service.id))}
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm transition-colors ${
                      service.status === 'Active'
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}
                  >
                    {service.status}
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#07190e] line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#07190e]/60 line-clamp-2 mt-1">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#07190e]/5 text-xs">
                    <div className="flex items-center justify-between text-[#07190e]/70">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#07190e]/40" />
                        Timeframe:
                      </span>
                      <span className="font-medium text-[#07190e]">{service.duration || 'N/A'}</span>
                    </div>

                    <div className="flex items-center justify-between text-[#07190e]/70">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#07190e]/40" />
                        Warranty:
                      </span>
                      <span className="font-medium text-[#07190e]">{service.warranty || 'Included'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#07190e]/60">Starting Price:</span>
                      <span className="text-base font-semibold text-[#07190e]">
                        AED {Number(service.startingPrice || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#07190e]/[0.02] border-t border-[#07190e]/10 flex items-center justify-between">
                <Link
                  href={`/dashboard/services/${service.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#07190e] hover:underline"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Package
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteModalId(service.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#07190e]/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#07190e]">
              <thead className="bg-[#07190e]/5 text-xs uppercase tracking-wider text-[#07190e]/70 border-b border-[#07190e]/10">
                <tr>
                  <th className="p-4 font-semibold">Service Package</th>
                  <th className="p-4 font-semibold">Pillar Category</th>
                  <th className="p-4 font-semibold">Starting Price</th>
                  <th className="p-4 font-semibold">Timeframe</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#07190e]/10">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-[#07190e]/[0.01] transition-colors">
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-3">
                        {service.image && (
                          <img
                            src={service.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-[#07190e]/10"
                          />
                        )}
                        <div>
                          <div className="font-semibold">{service.title}</div>
                          <div className="text-xs text-[#07190e]/50 line-clamp-1">{service.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-medium text-[#07190e]/70">
                      {getPillarTitle(service.pillarId)}
                    </td>
                    <td className="p-4 font-semibold">
                      AED {Number(service.startingPrice || 0).toLocaleString()}
                    </td>
                    <td className="p-4 text-xs text-[#07190e]/70">
                      {service.duration || 'N/A'}
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => dispatch(toggleServiceStatus(service.id))}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          service.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {service.status}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/services/${service.id}`}
                          className="p-2 text-[#07190e]/70 hover:text-[#07190e] hover:bg-[#07190e]/5 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteModalId(service.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-medium text-[#07190e]">Delete Service Package</h3>
              <p className="text-sm text-[#07190e]/60">
                Are you sure you want to remove this service package? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2.5 rounded-xl border border-[#07190e]/20 text-[#07190e] text-sm font-medium hover:bg-[#07190e]/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}