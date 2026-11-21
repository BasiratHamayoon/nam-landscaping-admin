'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Image as ImageIcon,
  Check,
  Package
} from 'lucide-react';
import { addProduct } from '@/redux/slices/productSlice';

export default function NewProductPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Indoor Plants',
    subcategory: '',
    price: '',
    comparePrice: '',
    stock: '',
    sku: '',
    image: '',
    description: '',
    features: [''],
    dimensions: '',
    sunlight: 'Bright Indirect',
    watering: 'Moderate',
    isFeatured: false,
    status: 'Active'
  });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Safely generate dynamic SKU on client-side mount
    const generatedSku = `RP-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData((prev) => ({ ...prev, sku: generatedSku }));
  }, []);

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
    const newProduct = {
      ...formData,
      id: `prod-${Date.now()}`,
      price: Number(formData.price) || 0,
      comparePrice: formData.comparePrice ? Number(formData.comparePrice) : null,
      stock: Number(formData.stock) || 0,
      features: formData.features.filter((f) => f.trim() !== '')
    };

    dispatch(addProduct(newProduct));
    setToastMessage('Product created successfully!');
    setTimeout(() => {
      router.push('/dashboard/products');
    }, 1500);
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
            href="/dashboard/products"
            className="inline-flex items-center gap-2 text-sm text-[#07190e]/60 hover:text-[#07190e] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products Catalog
          </Link>
          <h1 className="text-3xl font-serif font-medium text-[#07190e]">Add New Product</h1>
          <p className="text-sm text-[#07190e]/60 mt-1">
            Publish a new plant specimen, luxury planter, or irrigation kit to the boutique catalog.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-serif font-medium text-[#07190e] border-b border-[#07190e]/10 pb-3">
                General Information
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Royal Phoenix Date Palm (3m)"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  >
                    <option value="Indoor Plants">Indoor Plants</option>
                    <option value="Outdoor Palms">Outdoor Palms</option>
                    <option value="Luxury Planters">Luxury Planters</option>
                    <option value="Irrigation Systems">Irrigation Systems</option>
                    <option value="Garden Accents">Garden Accents</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Subcategory / Tag
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g. Specimen Palms, Fiberstone Pots"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed description of the botanical specimen or hardscape product..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e] resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-serif font-medium text-[#07190e] border-b border-[#07190e]/10 pb-3">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Price (AED) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#07190e]/50">
                      AED
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="1800"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Compare Price (AED)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#07190e]/50">
                      AED
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.comparePrice}
                      onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                      placeholder="2200"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="10"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="RP-1001"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#07190e]/10 pb-3">
                <h2 className="text-lg font-serif font-medium text-[#07190e]">Key Features</h2>
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#07190e] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      placeholder={`Feature ${idx + 1}`}
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
                Product Image
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

                <div className="aspect-square rounded-xl border border-dashed border-[#07190e]/20 bg-[#07190e]/[0.02] flex flex-col items-center justify-center overflow-hidden relative">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <ImageIcon className="w-8 h-8 mx-auto text-[#07190e]/30" />
                      <p className="text-xs text-[#07190e]/50">Image Preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#07190e]/10 p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-serif font-medium text-[#07190e] border-b border-[#07190e]/10 pb-3">
                Settings & Care
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Sunlight Requirement
                  </label>
                  <select
                    value={formData.sunlight}
                    onChange={(e) => setFormData({ ...formData, sunlight: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  >
                    <option value="Full Sun">Full Sun</option>
                    <option value="Bright Indirect">Bright Indirect</option>
                    <option value="Partial Shade">Partial Shade</option>
                    <option value="Low Light">Low Light</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#07190e]/70">
                    Watering Needs
                  </label>
                  <select
                    value={formData.watering}
                    onChange={(e) => setFormData({ ...formData, watering: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#07190e]/15 focus:outline-none focus:border-[#07190e] text-sm text-[#07190e]"
                  >
                    <option value="High (Daily)">High (Daily)</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low (Weekly)">Low (Weekly)</option>
                    <option value="Minimal (Drought Tolerant)">Minimal (Drought Tolerant)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#07190e] focus:ring-[#07190e]"
                    />
                    <span className="text-sm font-medium text-[#07190e]">Feature on E-commerce Storefront</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-[#07190e] text-white hover:bg-[#07190e]/90 font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              Publish Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}