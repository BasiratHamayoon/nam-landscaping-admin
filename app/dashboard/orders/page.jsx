'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrders,
  selectOrderFilters,
  setSearchQuery,
  setTypeFilter,
  setStatusFilter,
  setPaymentStatusFilter,
  resetFilters,
  updateOrderStatus,
  deleteOrder
} from '@/redux/slices/orderSlice';
import {
  Search,
  Filter,
  FileText,
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
  DollarSign,
  Briefcase,
  TrendingUp,
  RefreshCw,
  X,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders) || [];
  const filters = useSelector(selectOrderFilters) || { search: '', type: 'all', status: 'all', paymentStatus: 'all' };

  const [viewMode, setViewMode] = useState('table');
  const [selectedForStatus, setSelectedForStatus] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [newMilestone, setNewMilestone] = useState('');
  const [newCompletion, setNewCompletion] = useState(50);
  const [deleteId, setDeleteId] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = filters.search.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.serviceTitle.toLowerCase().includes(query) ||
        order.location.toLowerCase().includes(query);

      const matchesType =
        filters.type === 'all' ||
        (filters.type === 'contract' && order.type === 'Service Contract') ||
        (filters.type === 'ecommerce' && order.type === 'E-Commerce Purchase');

      const matchesStatus =
        filters.status === 'all' || order.status.toLowerCase() === filters.status.toLowerCase();

      const matchesPayment =
        filters.paymentStatus === 'all' ||
        order.paymentStatus.toLowerCase() === filters.paymentStatus.toLowerCase();

      return matchesSearch && matchesType && matchesStatus && matchesPayment;
    });
  }, [orders, filters]);

  const kpis = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const activeCount = orders.filter((o) => o.status === 'Active Contract' || o.status === 'In Progress').length;
    const pendingCount = orders.filter((o) => o.status === 'Pending Approval').length;
    const completedCount = orders.filter((o) => o.status === 'Completed').length;
    return { totalRev, activeCount, pendingCount, completedCount };
  }, [orders]);

  const handleOpenStatusModal = (order) => {
    setSelectedForStatus(order);
    setNewStatus(order.status);
    setNewMilestone(order.milestone || '');
    setNewCompletion(order.completionPercentage || 0);
    setStatusNote('');
  };

  const handleSaveStatus = () => {
    if (!selectedForStatus) return;
    dispatch(
      updateOrderStatus({
        id: selectedForStatus.id,
        status: newStatus,
        milestone: newMilestone,
        completionPercentage: Number(newCompletion),
        note: statusNote || `Updated status to ${newStatus}`
      })
    );
    setSelectedForStatus(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      dispatch(deleteOrder(deleteId));
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active Contract':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active Contract</span>;
      case 'In Progress':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200"><RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" /> In Progress</span>;
      case 'Pending Approval':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"><Clock className="w-3.5 h-3.5 text-amber-600" /> Pending Approval</span>;
      case 'Completed':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-gray-600" /> Completed</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200"><XCircle className="w-3.5 h-3.5 text-rose-600" /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  const getPaymentBadge = (pStatus) => {
    switch (pStatus) {
      case 'Paid':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Paid</span>;
      case 'Deposit Paid':
      case 'Partial':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">{pStatus}</span>;
      case 'Refunded':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-800">Refunded</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">{pStatus}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#07190e]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Orders & Landscape Contracts
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage commercial landscape contracts, villa projects, and e-commerce plant orders.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting orders CSV statement...')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-gray-500" />
            Export Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Total Contract Value</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">
              AED {kpis.totalRev.toLocaleString()}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-1 font-medium">
              <TrendingUp className="w-3 h-3" /> Across {orders.length} Accounts
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#07190e]/5 border border-[#07190e]/10 flex items-center justify-center text-[#07190e]">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Active Field Projects</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.activeCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-blue-600 mt-1 font-medium">
              <Briefcase className="w-3 h-3" /> Under Site Execution
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Pending Approvals</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.pendingCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-amber-600 mt-1 font-medium">
              <Clock className="w-3 h-3" /> Requires Sign-Off
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Completed Projects</p>
            <h3 className="text-2xl font-bold text-[#07190e] mt-2">{kpis.completedCount}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-gray-600 mt-1 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Successfully Handed Over
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
              onClick={() => dispatch(setTypeFilter('all'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.type === 'all'
                  ? 'bg-white text-[#07190e] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => dispatch(setTypeFilter('contract'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.type === 'contract'
                  ? 'bg-white text-[#07190e] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Service Contracts
            </button>
            <button
              onClick={() => dispatch(setTypeFilter('ecommerce'))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.type === 'ecommerce'
                  ? 'bg-white text-[#07190e] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              E-Commerce Purchases
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
              placeholder="Search order ID, client name, service, or location..."
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
              <option value="all">All Statuses</option>
              <option value="Active Contract">Active Contract</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={filters.paymentStatus}
              onChange={(e) => dispatch(setPaymentStatusFilter(e.target.value))}
              className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07190e] bg-gray-50/50"
            >
              <option value="all">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial / Deposit</option>
              <option value="Refunded">Refunded</option>
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

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">No orders found</h3>
          <p className="text-sm text-gray-500 mt-1">Try relaxing your search terms or clearing active filters.</p>
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
                  <th className="py-3.5 px-4">Order / Contract</th>
                  <th className="py-3.5 px-4">Client & Location</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Amount & Payment</th>
                  <th className="py-3.5 px-4">Milestone / Progress</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      <div className="font-mono text-xs text-[#07190e] font-bold">{order.id}</div>
                      <div className="text-xs text-gray-600 line-clamp-1 mt-0.5">{order.serviceTitle}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {order.orderDate}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900 text-xs">{order.customerName}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 line-clamp-1">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{order.location}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium ${
                        order.type === 'Service Contract'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {order.type === 'Service Contract' ? <Briefcase className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                        {order.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900 text-xs">
                        AED {order.totalAmount.toLocaleString()}
                      </div>
                      <div className="mt-1">{getPaymentBadge(order.paymentStatus)}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-xs text-gray-700 line-clamp-1 font-medium">
                        {order.milestone || 'In Delivery Processing'}
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                        <div
                          className="bg-[#07190e] h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${order.completionPercentage || 0}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5 text-right font-mono">
                        {order.completionPercentage || 0}% Completed
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="p-1.5 text-gray-600 hover:text-[#07190e] hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenStatusModal(order)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Update Status & Progress"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(order.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
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
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#07190e] bg-gray-100 px-2 py-0.5 rounded">
                    {order.id}
                  </span>
                  {getStatusBadge(order.status)}
                </div>

                <h3 className="text-base font-bold text-gray-900 mt-3 line-clamp-1">{order.serviceTitle}</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">{order.customerName}</p>

                <div className="mt-3 space-y-2 text-xs text-gray-500 border-t border-b border-gray-100 py-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="line-clamp-1">{order.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {order.orderDate}
                    </span>
                    <span className="font-semibold text-gray-900">AED {order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-400">Payment:</span>
                    {getPaymentBadge(order.paymentStatus)}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
                    <span className="line-clamp-1 text-[11px]">{order.milestone || 'In Progress'}</span>
                    <span>{order.completionPercentage || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#07190e] h-1.5 rounded-full"
                      style={{ width: `${order.completionPercentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleOpenStatusModal(order)}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Quick Update
                </button>
                <Link
                  href={`/dashboard/orders/${order.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#07190e] text-white text-xs font-medium rounded-lg hover:bg-[#11381e] transition-colors"
                >
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedForStatus && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Update Order Progress & Status
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{selectedForStatus.id} - {selectedForStatus.customerName}</p>
              </div>
              <button
                onClick={() => setSelectedForStatus(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Contract Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#07190e]"
                >
                  <option value="Active Contract">Active Contract</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Current Execution Milestone
                </label>
                <input
                  type="text"
                  placeholder="e.g. Phase 2: Drip Irrigation Installation"
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#07190e]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  <span>Completion Percentage</span>
                  <span className="font-mono text-gray-900">{newCompletion}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={newCompletion}
                  onChange={(e) => setNewCompletion(e.target.value)}
                  className="w-full accent-[#07190e] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Status Note / Log Entry
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter reason or note for status modification..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#07190e]"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedForStatus(null)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
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
                Delete Order Record?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to delete <span className="font-mono font-bold text-gray-800">{deleteId}</span>? This action will remove the record from the admin system.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}