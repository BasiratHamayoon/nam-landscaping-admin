'use client';

import { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrders,
  updateOrderStatus,
  updatePaymentStatus,
  assignProjectManager,
  addOrderNote
} from '@/redux/slices/orderSlice';
import {
  ArrowLeft,
  Printer,
  Download,
  UserCheck,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  MessageSquare,
  ShieldCheck,
  Briefcase,
  Phone,
  Mail,
  Building,
  FileCheck,
  ChevronRight,
  RefreshCw,
  X,
  CreditCard
} from 'lucide-react';

function OrderDetailContent() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const orderId = params?.id;

  const orders = useSelector(selectOrders) || [];
  const order = orders.find((o) => o.id === orderId);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [statusVal, setStatusVal] = useState(order?.status || '');
  const [milestoneVal, setMilestoneVal] = useState(order?.milestone || '');
  const [completionVal, setCompletionVal] = useState(order?.completionPercentage || 0);
  const [statusNoteVal, setStatusNoteVal] = useState('');

  const [paymentStatusVal, setPaymentStatusVal] = useState(order?.paymentStatus || '');
  const [paidAmountVal, setPaidAmountVal] = useState(order?.paidAmount || 0);

  const [pmVal, setPmVal] = useState(order?.projectManager || '');
  const [engineerVal, setEngineerVal] = useState(order?.leadEngineer || '');

  const [newNoteText, setNewNoteText] = useState('');

  if (!order) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-xl mx-auto my-12 shadow-sm space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Order or Contract Not Found
        </h2>
        <p className="text-sm text-gray-500">
          The requested record ID <span className="font-mono text-gray-800">{orderId}</span> does not exist or has been deleted.
        </p>
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#07190e] text-white text-xs font-semibold rounded-lg hover:bg-[#11381e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Orders List
        </Link>
      </div>
    );
  }

  const handleSaveStatus = () => {
    dispatch(
      updateOrderStatus({
        id: order.id,
        status: statusVal,
        milestone: milestoneVal,
        completionPercentage: Number(completionVal),
        note: statusNoteVal || `Updated status to ${statusVal}`
      })
    );
    setShowStatusModal(false);
  };

  const handleSavePayment = () => {
    dispatch(
      updatePaymentStatus({
        id: order.id,
        paymentStatus: paymentStatusVal,
        paidAmount: Number(paidAmountVal)
      })
    );
    setShowPaymentModal(false);
  };

  const handleSaveAssign = () => {
    dispatch(
      assignProjectManager({
        id: order.id,
        projectManager: pmVal,
        leadEngineer: engineerVal
      })
    );
    setShowAssignModal(false);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    dispatch(
      addOrderNote({
        id: order.id,
        text: newNoteText,
        author: 'Admin'
      })
    );
    setNewNoteText('');
  };

  const subtotal = order.totalAmount / 1.05;
  const vatAmount = order.totalAmount - subtotal;
  const remainingBalance = Math.max(0, order.totalAmount - (order.paidAmount || 0));

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active Contract':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active Contract</span>;
      case 'In Progress':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200"><RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" /> In Progress</span>;
      case 'Pending Approval':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200"><Clock className="w-3.5 h-3.5 text-amber-600" /> Pending Approval</span>;
      case 'Completed':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-gray-600" /> Completed</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200"><XCircle className="w-3.5 h-3.5 text-rose-600" /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-200 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-[#07190e] text-white px-2.5 py-0.5 rounded">
                {order.id}
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {order.type}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#07190e] mt-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {order.serviceTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-gray-500" /> Print Contract
          </button>
          <button
            onClick={() => {
              setStatusVal(order.status);
              setMilestoneVal(order.milestone || '');
              setCompletionVal(order.completionPercentage || 0);
              setShowStatusModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#07190e] text-white hover:bg-[#11381e] text-xs font-medium transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Update Status
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contract Status</span>
          <div className="mt-2">{getStatusBadge(order.status)}</div>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Value</span>
          <h3 className="text-xl font-bold text-gray-900 mt-1">AED {order.totalAmount.toLocaleString()}</h3>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">Includes 5% UAE VAT</p>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment Status</span>
          <div className="mt-1 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold ${
              order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {order.paymentStatus}
            </span>
            <button
              onClick={() => {
                setPaymentStatusVal(order.paymentStatus);
                setPaidAmountVal(order.paidAmount || 0);
                setShowPaymentModal(true);
              }}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Paid: AED {order.paidAmount?.toLocaleString() || 0}</p>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Site Execution Progress</span>
          <div className="mt-1 flex items-center justify-between text-xs font-semibold text-gray-800">
            <span className="line-clamp-1">{order.milestone || 'Site Execution'}</span>
            <span>{order.completionPercentage || 0}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-[#07190e] h-2 rounded-full transition-all duration-300"
              style={{ width: `${order.completionPercentage || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Scope of Work & Procurement Items
              </h3>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {order.items?.length || 0} Items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="py-3 px-3">Item Description</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-right">Unit Price</th>
                    <th className="py-3 px-3 text-center">Qty</th>
                    <th className="py-3 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {order.items?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-3 font-semibold text-gray-900">{item.name}</td>
                      <td className="py-3.5 px-3 text-gray-500">{item.category}</td>
                      <td className="py-3.5 px-3 text-right font-mono text-gray-700">AED {item.price.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-center font-bold text-gray-800">{item.quantity}</td>
                      <td className="py-3.5 px-3 text-right font-bold text-gray-900 font-mono">
                        AED {item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col items-end space-y-2 text-xs">
              <div className="flex justify-between w-64 text-gray-600">
                <span>Subtotal (Excl. VAT):</span>
                <span className="font-mono">AED {Math.round(subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-64 text-gray-600">
                <span>UAE VAT (5%):</span>
                <span className="font-mono">AED {Math.round(vatAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-64 text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total Contract Amount:</span>
                <span className="font-mono text-[#07190e]">AED {order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-64 text-gray-600 pt-1">
                <span>Amount Paid:</span>
                <span className="font-mono text-emerald-700 font-bold">AED {order.paidAmount?.toLocaleString() || 0}</span>
              </div>
              {remainingBalance > 0 && (
                <div className="flex justify-between w-64 text-rose-700 font-bold pt-1">
                  <span>Remaining Balance:</span>
                  <span className="font-mono">AED {remainingBalance.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Project Execution Log & History
            </h3>

            <div className="relative pl-6 border-l-2 border-gray-200 space-y-6 my-4">
              {order.timeline?.map((event, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#07190e] border-2 border-white ring-2 ring-emerald-100"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="font-bold text-gray-900 text-sm">{event.status}</span>
                    <span className="font-mono text-gray-400">{event.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 mt-1">
                    {event.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Internal Engineering Notes & Updates
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={3}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Type an internal engineering log, site observation, or client note..."
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#07190e] text-white text-xs font-semibold rounded-lg hover:bg-[#11381e] disabled:opacity-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Post Log Entry
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-2">
              {order.notes?.map((note) => (
                <div key={note.id} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                      {note.author}
                    </span>
                    <span className="text-emerald-700 font-mono text-[11px]">{note.date}</span>
                  </div>
                  <p className="text-xs text-emerald-800">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Client & Site Information
              </h3>
              <Building className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Account / Entity</span>
                <span className="font-bold text-gray-900 text-sm">{order.customerName}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-medium">Contact Person</span>
                <span className="font-semibold text-gray-800">{order.contactPerson || order.customerName}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 pt-1">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline line-clamp-1">{order.email}</a>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{order.phone}</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-400 block font-medium mb-1">Project Site Location</span>
                <div className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-800">
                  <MapPin className="w-4 h-4 text-[#07190e] shrink-0 mt-0.5" />
                  <span className="font-medium">{order.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Assigned Management
              </h3>
              <button
                onClick={() => {
                  setPmVal(order.projectManager || '');
                  setEngineerVal(order.leadEngineer || '');
                  setShowAssignModal(true);
                }}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Reassign
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider block">Project Manager</span>
                  <span className="font-bold text-gray-900">{order.projectManager || 'Unassigned'}</span>
                </div>
                <Briefcase className="w-4 h-4 text-[#07190e]" />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider block">Lead Field Engineer</span>
                  <span className="font-bold text-gray-900">{order.leadEngineer || 'Unassigned'}</span>
                </div>
                <UserCheck className="w-4 h-4 text-emerald-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Payment Method & Billing
              </h3>
              <CreditCard className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Payment Gateway/Method:</span>
                <span className="font-semibold text-gray-800">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Order Placed Date:</span>
                <span className="font-mono text-gray-800">{order.orderDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Receipt Invoice:</span>
                <span className="font-mono text-emerald-700 font-bold">INV-{order.id.replace('ORD-', '')}</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading Official VAT Tax Invoice for ${order.id}...`)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg border border-gray-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-gray-600" /> Download VAT Tax Invoice
            </button>
          </div>
        </div>
      </div>

      {showStatusModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Update Contract Status
              </h3>
              <button onClick={() => setShowStatusModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                >
                  <option value="Active Contract">Active Contract</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Milestone Headline</label>
                <input
                  type="text"
                  value={milestoneVal}
                  onChange={(e) => setMilestoneVal(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                  <span>Execution Progress</span>
                  <span>{completionVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={completionVal}
                  onChange={(e) => setCompletionVal(e.target.value)}
                  className="w-full accent-[#07190e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Log Note</label>
                <textarea
                  rows={2}
                  value={statusNoteVal}
                  onChange={(e) => setStatusNoteVal(e.target.value)}
                  placeholder="Optional log entry..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-4 py-2 text-xs font-medium text-white bg-[#07190e] hover:bg-[#11381e] rounded-lg"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Update Payment Status
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Payment Status</label>
                <select
                  value={paymentStatusVal}
                  onChange={(e) => setPaymentStatusVal(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                >
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Deposit Paid">Deposit Paid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Paid Amount (AED)</label>
                <input
                  type="number"
                  value={paidAmountVal}
                  onChange={(e) => setPaidAmountVal(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="px-4 py-2 text-xs font-medium text-white bg-[#07190e] hover:bg-[#11381e] rounded-lg"
              >
                Update Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Assign Operations Management
              </h3>
              <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project Manager</label>
                <input
                  type="text"
                  value={pmVal}
                  onChange={(e) => setPmVal(e.target.value)}
                  placeholder="e.g. Eng. Tariq Al-Mansoor"
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Lead Field Engineer</label>
                <input
                  type="text"
                  value={engineerVal}
                  onChange={(e) => setEngineerVal(e.target.value)}
                  placeholder="e.g. Youssef El-Hassan"
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssign}
                className="px-4 py-2 text-xs font-medium text-white bg-[#07190e] hover:bg-[#11381e] rounded-lg"
              >
                Save Assignments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500 font-medium">Loading contract details...</div>}>
      <OrderDetailContent />
    </Suspense>
  );
}