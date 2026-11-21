'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Grid,
  List,
  Edit2,
  Trash2,
  Sparkles,
  CheckCircle2,
  Layers,
  Briefcase,
  Clock,
  Star,
  AlertTriangle,
  GitBranch,
  Award
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
  const services = useSelector(selectServices);
  const { searchQuery, selectedDivision, selectedStatus, viewMode } = useSelector(selectServiceFilters);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const divisions = ['all', ...Array.from(new Set(services.map((s) => s.division)))];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subServices?.some((sub) => sub.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDivision = selectedDivision === 'all' || service.division === selectedDivision;
    const matchesStatus = selectedStatus === 'all' || service.status === selectedStatus;

    return matchesSearch && matchesDivision && matchesStatus;
  });

  const totalServices = services.length;
  const totalSubServices = services.reduce((acc, s) => acc + (s.subServices?.length || 0), 0);
  const totalActiveContracts = services.reduce((acc, s) => acc + (s.activeContracts || 0), 0);
  const totalCompletedProjects = services.reduce((acc, s) => acc + (s.completedProjects || 0), 0);

  const handleDeleteConfirm = () => {
    if (deleteModalId) {
      dispatch(deleteService(deleteModalId));
      setDeleteModalId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Service Architecture & Offerings
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Services Management</h1>
          <p className="text-slate-600 text-sm mt-0.5">
            Manage primary landscaping categories, nested sub-services, starting rates, and SEO pages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/services/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Service
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Main Services</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-3">{totalServices}</div>
          <div className="text-xs text-slate-500 mt-1">Primary website service pillars</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nested Sub-Services</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-3">{totalSubServices}</div>
          <div className="text-xs text-slate-500 mt-1">Dedicated sub-service landing pages</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Contracts</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-3">{totalActiveContracts}</div>
          <div className="text-xs text-slate-500 mt-1">Ongoing Dubai villa & AMC sites</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed Projects</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-3">{totalCompletedProjects.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">Delivered across UAE communities</div>
        </motion.div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search service, sub-service, or slug..."
              value={searchQuery}
              onChange={(e) => dispatch(setServiceSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDivision}
              onChange={(e) => dispatch(setSelectedDivision(e.target.value))}
              className="w-full sm:w-48 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition-all"
            >
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div === 'all' ? 'All Divisions' : div}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => dispatch(setSelectedServiceStatus(e.target.value))}
              className="w-full sm:w-36 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition-all"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
          <span className="text-xs text-slate-600 font-medium">
            Showing <strong className="text-emerald-700">{filteredServices.length}</strong> services
          </span>
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => dispatch(setServiceViewMode('grid'))}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => dispatch(setServiceViewMode('table'))}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No services match your filters</h3>
          <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
            Try clearing your search query or create a new landscaping service division.
          </p>
        </motion.div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          service.status === 'Active'
                            ? 'bg-emerald-500/95 border-emerald-600 text-white'
                            : 'bg-slate-700/90 border-slate-800 text-white'
                        }`}
                      >
                        {service.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                        {service.status}
                      </span>
                      {service.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/95 text-white border border-amber-600">
                          <Sparkles className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Link
                        href={`/dashboard/services/${service.id}`}
                        className="p-2 rounded-xl bg-white hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 shadow-sm transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setDeleteModalId(service.id)}
                        className="p-2 rounded-xl bg-white hover:bg-rose-600 text-slate-700 hover:text-white border border-slate-200 shadow-sm transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                          {service.division}
                        </span>
                        <span className="text-xs font-mono text-slate-200">
                          /services/{service.slug}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-300 block">Starts From</span>
                        <span className="text-xs font-bold text-white bg-emerald-700 px-2.5 py-1 rounded-lg inline-block mt-0.5">
                          AED {service.startingPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/dashboard/services/${service.id}`}
                        className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                      >
                        {service.title}
                      </Link>
                      <div className="flex items-center gap-1 text-amber-600 text-xs font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {service.rating}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Sub-Services ({service.subServices?.length || 0})</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {service.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.subServices?.slice(0, 3).map((sub) => (
                          <span
                            key={sub.id}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700"
                          >
                            {sub.title}
                          </span>
                        ))}
                        {(service.subServices?.length || 0) > 3 && (
                          <span className="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                            +{service.subServices.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>
                      <strong className="text-slate-900">{service.activeContracts}</strong> Active Sites
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-900">{service.completedProjects}</strong> Delivered
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(toggleServiceStatus(service.id))}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
                  >
                    Toggle Status
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Service & Route Slug</th>
                  <th className="p-4">Division</th>
                  <th className="p-4">Sub-Services</th>
                  <th className="p-4">Starting Rate</th>
                  <th className="p-4">Active Sites</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={service.heroImage}
                          alt={service.title}
                          className="w-14 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <Link
                            href={`/dashboard/services/${service.id}`}
                            className="font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors block"
                          >
                            {service.title}
                          </Link>
                          <span className="text-[11px] font-mono text-slate-500">/services/{service.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">{service.division}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-[11px]">
                        {service.subServices?.length || 0} Sub-Pages
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">AED {service.startingPrice.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500">{service.pricingModel}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{service.activeContracts} Active</div>
                      <div className="text-[10px] text-slate-500">{service.completedProjects} Completed</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          service.status === 'Active'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/services/${service.id}`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 transition-colors border border-slate-200"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalId(service.id)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-700 transition-colors border border-slate-200"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-4 text-slate-900"
          >
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Service Pillar</h3>
                <p className="text-xs text-slate-500">All nested sub-services under this pillar will also be removed.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to permanently remove this service offering from the Royal Plantscape catalog?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}