'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectInquiries,
  updateInquiryStatus,
  assignConsultant,
  addInquiryNote
} from '@/redux/slices/inquirySlice';
import {
  ArrowLeft,
  Phone,
  Mail,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Crown,
  Sparkles,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  RefreshCw,
  X,
  Send,
  Briefcase
} from 'lucide-react';

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const inquiryId = params?.id;

  const inquiries = useSelector(selectInquiries) || [];
  const inquiry = inquiries.find((i) => i.id === inquiryId);

  const [showModal, setShowModal] = useState(false);
  const [statusVal, setStatusVal] = useState(inquiry?.status || '');
  const [consultantVal, setConsultantVal] = useState(inquiry?.assignedConsultant || '');
  const [consultationDateVal, setConsultationDateVal] = useState(inquiry?.consultationDate || '');
  const [statusNoteVal, setStatusNoteVal] = useState('');

  const [newNoteText, setNewNoteText] = useState('');

  if (!inquiry) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-xl mx-auto my-12 shadow-sm space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Consultation Inquiry Not Found
        </h2>
        <p className="text-sm text-gray-500">
          The requested inquiry record ID <span className="font-mono text-gray-800">{inquiryId}</span> does not exist or has been deleted.
        </p>
        <Link
          href="/dashboard/inquiries"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#07190e] text-white text-xs font-semibold rounded-lg hover:bg-[#11381e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Consultation Leads
        </Link>
      </div>
    );
  }

  const handleSaveModal = () => {
    dispatch(
      updateInquiryStatus({
        id: inquiry.id,
        status: statusVal,
        consultationDate: consultationDateVal,
        note: statusNoteVal || `Status updated to ${statusVal}`
      })
    );
    if (consultantVal !== inquiry.assignedConsultant) {
      dispatch(
        assignConsultant({
          id: inquiry.id,
          consultant: consultantVal
        })
      );
    }
    setShowModal(false);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    dispatch(
      addInquiryNote({
        id: inquiry.id,
        text: newNoteText,
        author: 'Admin'
      })
    );
    setNewNoteText('');
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'VIP High':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <Crown className="w-3.5 h-3.5 text-rose-600 fill-rose-100" /> VIP High Priority
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            Medium Priority
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
            Standard Priority
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New Lead':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200"><Sparkles className="w-3.5 h-3.5 text-blue-600" /> New Lead</span>;
      case 'Contacted':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200"><Phone className="w-3.5 h-3.5 text-sky-600" /> Contacted</span>;
      case 'Consultation Scheduled':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200"><Calendar className="w-3.5 h-3.5 text-amber-600" /> Scheduled</span>;
      case 'Proposal Sent':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200"><Send className="w-3.5 h-3.5 text-indigo-600" /> Proposal Sent</span>;
      case 'Contract Closed':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Closed</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/inquiries"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-200 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-[#07190e] text-white px-2.5 py-0.5 rounded">
                {inquiry.id}
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {inquiry.submittedAt}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#07190e] mt-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {inquiry.clientName}
            </h1>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <a
            href={`tel:${inquiry.phone}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" /> Call Client
          </a>
          <a
            href={`mailto:${inquiry.email}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-blue-600" /> Email Client
          </a>
          <button
            onClick={() => {
              setStatusVal(inquiry.status);
              setConsultantVal(inquiry.assignedConsultant || 'Unassigned');
              setConsultationDateVal(inquiry.consultationDate || '');
              setShowModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#07190e] text-white hover:bg-[#11381e] text-xs font-medium transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Manage Lead
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Priority Ranking</span>
          <div className="mt-2">{getPriorityBadge(inquiry.priority)}</div>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pipeline Status</span>
          <div className="mt-2">{getStatusBadge(inquiry.status)}</div>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Estimated Budget</span>
          <h3 className="text-lg font-bold text-gray-900 mt-1 font-mono text-emerald-800">{inquiry.estimatedBudget}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{inquiry.serviceCategory}</p>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Site Consultation</span>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>{inquiry.consultationDate || 'Not Scheduled Yet'}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Consultant: {inquiry.assignedConsultant || 'Unassigned'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Client Project Scope Statement
              </h3>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-sm text-gray-800 leading-relaxed font-sans italic">
              "{inquiry.message}"
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Lead History & Action Log
            </h3>

            <div className="relative pl-6 border-l-2 border-gray-200 space-y-6 my-4">
              {inquiry.timeline?.map((event, idx) => (
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
              Internal Team Consultation Notes
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={3}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log internal details regarding site access, engineering team readiness, or client preferences..."
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#07190e] text-white text-xs font-semibold rounded-lg hover:bg-[#11381e] disabled:opacity-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Post Consultation Note
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-2">
              {inquiry.notes?.map((note) => (
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
                Client Details
              </h3>
              <Building className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Full Name / Account</span>
                <span className="font-bold text-gray-900 text-sm">{inquiry.clientName}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-medium">Company / Entity</span>
                <span className="font-semibold text-gray-800">{inquiry.company || 'Private Owner'}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 pt-1">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline line-clamp-1">{inquiry.email}</a>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{inquiry.phone}</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-400 block font-medium mb-1">Site Location</span>
                <div className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-800">
                  <MapPin className="w-4 h-4 text-[#07190e] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">{inquiry.location}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{inquiry.propertyType}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Assigned Senior Consultant
              </h3>
              <Briefcase className="w-4 h-4 text-[#07190e]" />
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Lead Consultant</span>
                <span className="font-bold text-gray-900 text-sm">{inquiry.assignedConsultant || 'Unassigned'}</span>
              </div>
              <UserCheck className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Manage Consultation Lead
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
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
                  <option value="New Lead">New Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Consultation Scheduled">Consultation Scheduled</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Contract Closed">Contract Closed</option>
                  <option value="Archived / Lost">Archived / Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Consultant</label>
                <select
                  value={consultantVal}
                  onChange={(e) => setConsultantVal(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Eng. Tariq Al-Mansoor">Eng. Tariq Al-Mansoor</option>
                  <option value="Sarah Jenkins">Sarah Jenkins</option>
                  <option value="Faisal Farooq">Faisal Farooq</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Consultation Date & Time</label>
                <input
                  type="text"
                  value={consultationDateVal}
                  onChange={(e) => setConsultationDateVal(e.target.value)}
                  placeholder="e.g. 2025-02-28 11:00 AM"
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Log Note</label>
                <textarea
                  rows={2}
                  value={statusNoteVal}
                  onChange={(e) => setStatusNoteVal(e.target.value)}
                  placeholder="Optional status note..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-xs"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-4 py-2 text-xs font-medium text-white bg-[#07190e] hover:bg-[#11381e] rounded-lg"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}