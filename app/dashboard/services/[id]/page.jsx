'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Trash2,
  Check,
  AlertCircle,
  Plus,
  X,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { selectServices, updateSubService, deleteSubService } from '@/redux/slices/serviceSlice';

function EditSubServiceContent() {
  const params = useParams();
  const serviceId = params?.id;
  const dispatch = useDispatch();
  const router = useRouter();

  const { pillars, subServices } = useSelector(selectServices);
  const existingService = subServices.find((s) => String(s.id) === String(serviceId));

  const [formData, setFormData] = useState({
    title: '',
    pillarId: '',
    startingPrice: '',
    duration: '',
    warranty: '',
    description: '',
    features: [''],
    image: '',
    status: 'Active'
  });

  const [toastMessage, setToastMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (existingService) {
      setFormData({
        title: existingService.title || '',
        pillarId: existingService.pillarId || (pillars[0]?.id || ''),
        startingPrice: existingService.startingPrice !== undefined ? String(existingService.startingPrice) : '',
        duration: existingService.duration || '',
        warranty: existingService.warranty || '',
        description: existingService.description || '',
        features: existingService.features && existingService.features.length > 0 ? existingService.features : [''],
        image: existingService.image || '',
        status: existingService.status || 'Active'
      });
    }
  }, [existingService, pillars]);

  if (!existingService) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-2 text-sm text-[#07190e]/60 hover:text-[#07190e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Service Offerings
        </Link>
        <div className="bg-white rounded-2xl border border-[#07190e]/10 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-medium text-[#07190e]">Service Offering Not Found</h2>
          <p className="text-sm text-[#07190e]/60 max-w-md mx-auto">
            The service package you are attempting to edit does not exist or may have been removed.
          </p>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#07190e] text-white hover:bg-[#07190e]/90 font-medium text-sm transition-colors"
          >
            Return to Services
          </Link>
        </div>
      </div>
    );
  }

  const handleFeatureChange = (index, value) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData({ ...formData, features: updated });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeatureField = (index) => {
    const updated = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updated.length > 0 ? updated : [''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...formData,
      id: existingService.id,
      startingPrice: Number(formData.startingPrice) || 0,
      features: formData.features.filter((f) => f.trim() !== '')
    };

    dispatch(updateSubService(updatedItem));
    setToastMessage('Service offering updated successfully!');
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleDelete = () => {
    dispatch(deleteSubService(existingService.id));
    router.push('/dashboard/services');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#07190e] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-2 text-sm text-[#07190e]/60 hover:text-[#07190e] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="text-3xl font-serif font-medium text-[#07190e]">Edit Service Package</h1>
          <p className="text-sm text-[#07190e]/60 mt-1">
            Configure baseline pricing, scope, warranty, and features for {formData.title || 'this package'}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 font-medium text-sm transition-colors border border-red-200 self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          Delete Package
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-serif font-medium text-[#07190e] border-b border-[#07190e]/10 pb-3">
                Service Details
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Bespoke Villa Garden Design & Build"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Parent Service Pillar *
                  </label>
                  <select
                    value={formData.pillarId}
                    onChange={(e) => setFormData({ ...formData, pillarId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  >
                    {pillars.map((pillar) => (
                      <option key={pillar.id} value={pillar.id}>
                        {pillar.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Starting Price (AED) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#07190e]/50">
                      AED
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                      placeholder="25000"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Execution Timeframe
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 3 - 6 Weeks"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Warranty / Maintenance Guarantee
                  </label>
                  <input
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    placeholder="e.g. 1 Year Plant Replacements & Drip Checks"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                  Service Scope & Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed explanation of design phases, installation procedures, and deliverables..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e] resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#07190e]/10 pb-3">
                <h2 className="text-lg font-serif font-medium text-[#07190e]">Service Deliverables & Inclusions</h2>
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#07190e] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Inclusions
                </button>
              </div>

              <div className="space-y-3">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      placeholder={`Inclusion ${idx + 1}`}
                      className="flex-1 px-4 py-2 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeatureField(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-serif font-medium text-[#07190e] border-b border-[#07190e]/10 pb-3">
                Featured Cover Image
              </h2>

              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                />

                <div className="aspect-video rounded-xl border border-dashed border-[#07190e]/20 bg-[#07190e]/[0.02] flex flex-col items-center justify-center overflow-hidden relative">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <ImageIcon className="w-8 h-8 mx-auto text-[#07190e]/30" />
                      <p className="text-xs text-[#07190e]/50">Cover Image Preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-serif font-medium text-[#07190e] border-b border-[#07190e]/10 pb-3">
                Status
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                  Offering Availability
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                >
                  <option value="Active">Active (Accepting Bookings)</option>
                  <option value="Paused">Paused (Fully Booked)</option>
                  <option value="Draft">Draft (Internal)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-[#07190e] text-white hover:bg-[#07190e]/90 font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              Save Service Package
            </button>
          </div>
        </div>
      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-medium text-[#07190e]">Delete Service Package</h3>
              <p className="text-sm text-[#07190e]/60">
                Are you sure you want to delete <span className="font-semibold text-[#07190e]">{formData.title}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[#07190e]/20 text-[#07190e] text-sm font-medium hover:bg-[#07190e]/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
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

export default function EditSubServicePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-[#07190e]/60 animate-pulse">
          Loading service package details...
        </div>
      }
    >
      <EditSubServiceContent />
    </Suspense>
  );
}