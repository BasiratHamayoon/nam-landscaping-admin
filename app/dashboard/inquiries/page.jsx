'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectInquiries,
  selectInquiryFilters,
  setSearchQuery,
  setCategoryFilter,
  setStatusFilter,
  setPriorityFilter,
  resetFilters,
  updateInquiryStatus,
  assignConsultant,
  deleteInquiry
} from '@/redux/slices/inquirySlice';
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Trash2,
  Download,
  Building2,
  MapPin,
  Calendar,
  UserCheck,
  Crown,
  Sparkles,
  Phone,
  Mail,
  RefreshCw,
  X,
  ChevronRight,
  Briefcase,
  Send,
  UserPlus
} from 'lucide-react';

export default function InquiriesPage() {
  const dispatch = useDispatch();
  const inquiries = useSelector(selectInquiries) || [];
  const filters = useSelector(selectInquiryFilters) || { search: '', category: 'all', status: 'all', priority: 'all' };

  const [viewMode, setViewMode] = useState('table');
  const [selectedForModal, setSelectedForModal] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newConsultant, setNewConsultant] = useState('');
  const [newConsultationDate, setNewConsultationDate] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      const query = filters.search.toLowerCase();
      const matchesSearch =
        inquiry.id.toLowerCase().includes(query) ||
        inquiry.clientName.toLowerCase().includes(query) ||
        inquiry.company.toLowerCase().includes(query) ||
        inquiry.serviceCategory.toLowerCase().includes(query) ||
        inquiry.location.toLowerCase().includes(query);

      const matchesCategory =
        filters.category === 'all' || inquiry.serviceCategory.toLowerCase() === filters.category.toLowerCase();

      const matchesStatus =
        filters.status === 'all' || inquiry.status.toLowerCase() === filters.status.toLowerCase();

      const matchesPriority =
        filters.priority === 'all' || inquiry.priority.toLowerCase() === filters.priority.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [inquiries, filters]);

  const kpis = useMemo(() => {
    const total = inquiries.length;
    const vipCount = inquiries.filter((i) => i.priority === 'VIP High').length;
    const scheduledCount = inquiries.filter((i) => i.status === 'Consultation Scheduled').length;
    const closedCount = inquiries.filter((i) => i.status === 'Contract Closed').length;
    return { total, vipCount, scheduledCount, closedCount };
  }, [inquiries]);

  const handleOpenModal = (inquiry) => {
    setSelectedForModal(inquiry);
    setNewStatus(inquiry.status);
    setNewConsultant(inquiry.assignedConsultant || 'Unassigned');
    setNewConsultationDate(inquiry.consultationDate || '');
    setStatusNote('');
  };

  const handleSaveModal = () => {
    if (!selectedForModal) return;
    dispatch(
      updateInquiryStatus({
        id: selectedForModal.id,
        status: newStatus,
        consultationDate: newConsultationDate,
        note: statusNote || `Status updated to ${newStatus}`
      })
    );
    if (newConsultant !== selectedForModal.assignedConsultant) {
      dispatch(
        assignConsultant({
          id: selectedForModal.id,
          consultant: newConsultant
        })
      );
    }
    setSelectedForModal(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      dispatch(deleteInquiry(deleteId));
      setDeleteId(null);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'VIP High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <Crown className="w-3 h-3 text-rose-600 fill-rose-100" /> VIP High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            Standard
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New Lead':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200"><Sparkles className="w-3 h-3 text-blue-600" /> New Lead</span>;
      case 'Contacted':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200"><Phone className="w-3 h-3 text-sky-600" /> Contacted</span>;
      case 'Consultation Scheduled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"><Calendar className="w-3 h-3 text-amber-600" /> Scheduled</span>;
      case 'Proposal Sent':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200"><Send className="w-3 h-3 text-indigo-600" /> Proposal Sent</span>;
      case 'Contract Closed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Closed</span>;
      case 'Archived / Lost':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200"><XCircle className="w-3 h-3 text-gray-500" /> Archived</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#07190e]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            VIP Inquiries & Consultation Leads
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track incoming villa landscape inquiries, commercial RFPs, and site survey bookings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting leads dataset CSV...')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-gray-500" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Total Consultation Leads</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.total}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-blue-600 mt-1 font-medium">
              <Sparkles className="w-3 h-3" /> Active Pipeline
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">VIP High Priority</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.vipCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-rose-600 mt-1 font-medium">
              <Crown className="w-3 h-3" /> Royal & Estate Accounts
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Scheduled Site Surveys</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.scheduledCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-amber-600 mt-1 font-medium">
              <Calendar className="w-3 h-3" /> Confirmed Meetings
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Contracts Closed</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.closedCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-1 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Converted to Project
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-lg">
            <button
              onClick={() => dispatch(setPriorityFilter('all'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.priority === 'all'
                  ? 'bg-white text-[#07190e] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Priorities
            </button>
            <button
              onClick={() => dispatch(setPriorityFilter('VIP High'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.priority === 'VIP High'
                  ? 'bg-white text-rose-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              VIP High
            </button>
            <button
              onClick={() => dispatch(setPriorityFilter('Medium'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.priority === 'Medium'
                  ? 'bg-white text-[#07190e] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => dispatch(setPriorityFilter('Standard'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.priority === 'Standard'
                  ? 'bg-white text-[#07190e] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Standard
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">View:</span>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded text-xs font-medium border ${
                viewMode === 'table' ? 'bg-[#07190e] text-white border-[#07190e]' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded text-xs font-medium border ${
                viewMode === 'cards' ? 'bg-[#07190e] text-white border-[#07190e]' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Cards
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search lead ID, client name, company, or location..."
              value={filters.search}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07190e] bg-gray-50/50"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={filters.status}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07190e] bg-gray-50/50"
            >
              <option value="all">All Lead Statuses</option>
              <option value="New Lead">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Consultation Scheduled">Consultation Scheduled</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Contract Closed">Contract Closed</option>
              <option value="Archived / Lost">Archived / Lost</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={filters.category}
              onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
              className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07190e] bg-gray-50/50"
            >
              <option value="all">All Service Pillars</option>
              <option value="Villa Landscape Design">Villa Landscape Design</option>
              <option value="Custom Swimming Pool">Custom Swimming Pool</option>
              <option value="Hydroponic Living Walls">Hydroponic Living Walls</option>
              <option value="Turf & Irrigation System">Turf & Irrigation System</option>
              <option value="Indoor Specimen Plants">Indoor Specimen Plants</option>
              <option value="Commercial Maintenance">Commercial Maintenance</option>
            </select>
          </div>

          <div className="md:col-span-1 flex items-center">
            <button
              onClick={() => dispatch(resetFilters())}
              className="w-full py-2 px-2 text-xs font-semibold text-gray-600 hover:text-rose-600 border border-gray-200 hover:border-rose-200 rounded-lg bg-white flex items-center justify-center gap-1 transition-colors"
              title="Reset Filters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">No consultation inquiries found</h3>
          <p className="text-sm text-gray-500 mt-1">Try relaxing your search terms or priority filters.</p>
          <button
            onClick={() => dispatch(resetFilters())}
            className="mt-4 px-4 py-2 bg-[#07190e] text-white text-xs font-medium rounded-lg hover:bg-[#11381e] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-4">Lead / Client</th>
                  <th className="py-3.5 px-4">Service & Budget</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Consultant</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#07190e] bg-gray-100 px-1.5 py-0.5 rounded">
                          {inquiry.id}
                        </span>
                        <span className="text-[11px] text-gray-400">{inquiry.submittedAt.split(' ')[0]}</span>
                      </div>
                      <div className="font-semibold text-gray-900 text-xs mt-1">{inquiry.clientName}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{inquiry.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-800 text-xs">{inquiry.serviceCategory}</div>
                      <div className="text-xs text-emerald-700 font-mono font-medium mt-0.5">
                        {inquiry.estimatedBudget}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-xs text-gray-700 flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{inquiry.location}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{inquiry.propertyType}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {getPriorityBadge(inquiry.priority)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-xs font-semibold text-gray-800">
                        {inquiry.assignedConsultant || 'Unassigned'}
                      </div>
                      {inquiry.consultationDate && (
                        <div className="text-[10px] text-amber-700 font-mono flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" /> {inquiry.consultationDate}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(inquiry.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/dashboard/inquiries/${inquiry.id}`}
                          className="p-1.5 text-gray-600 hover:text-[#07190e] hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Inquiry Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenModal(inquiry)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Update Lead & Schedule"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(inquiry.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Lead"
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#07190e] bg-gray-100 px-2 py-0.5 rounded">
                    {inquiry.id}
                  </span>
                  {getPriorityBadge(inquiry.priority)}
                </div>

                <h3 className="text-base font-bold text-gray-900 mt-3 line-clamp-1">{inquiry.clientName}</h3>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">{inquiry.serviceCategory}</p>

                <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mt-3 line-clamp-2 italic">
                  "{inquiry.message}"
                </p>

                <div className="mt-3 space-y-1.5 text-xs text-gray-500 border-t border-b border-gray-100 py-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="line-clamp-1">{inquiry.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Budget:</span>
                    <span className="font-semibold text-gray-900">{inquiry.estimatedBudget}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-400">Consultant:</span>
                    <span className="font-medium text-gray-800">{inquiry.assignedConsultant || 'Unassigned'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>{getStatusBadge(inquiry.status)}</div>
                <Link
                  href={`/dashboard/inquiries/${inquiry.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#07190e] text-white text-xs font-medium rounded-lg hover:bg-[#11381e] transition-colors"
                >
                  Review <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Update Consultation Lead
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{selectedForModal.id} - {selectedForModal.clientName}</p>
              </div>
              <button onClick={() => setSelectedForModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Pipeline Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#07190e]"
                >
                  <option value="New Lead">New Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Consultation Scheduled">Consultation Scheduled</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Contract Closed">Contract Closed</option>
                  <option value="Archived / Lost">Archived / Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Assign Senior Landscape Consultant
                </label>
                <select
                  value={newConsultant}
                  onChange={(e) => setNewConsultant(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#07190e]"
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Eng. Tariq Al-Mansoor">Eng. Tariq Al-Mansoor</option>
                  <option value="Sarah Jenkins">Sarah Jenkins</option>
                  <option value="Faisal Farooq">Faisal Farooq</option>
                  <option value="Youssef El-Hassan">Youssef El-Hassan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Site Survey / Meeting Date & Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2025-02-28 11:00 AM"
                  value={newConsultationDate}
                  onChange={(e) => setNewConsultationDate(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#07190e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Status Change Note / Log Entry
                </label>
                <textarea
                  rows={2}
                  placeholder="Note regarding client conversation or survey outcome..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#07190e]"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedForModal(null)}
                className="px-4 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-4 py-2 text-xs font-medium text-white bg-[#07190e] hover:bg-[#11381e] rounded-lg transition-colors"
              >
                Save Updates
              </button>
            </div>
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
                Delete Consultation Inquiry?
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
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
