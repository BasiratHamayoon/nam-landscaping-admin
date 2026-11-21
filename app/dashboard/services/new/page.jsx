'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Sparkles,
  Layers,
  DollarSign,
  Image as ImageIcon,
  CheckCircle2,
  Globe,
  Plus,
  Trash2,
  GitBranch,
  ListChecks
} from 'lucide-react';
import { addService } from '@/redux/slices/serviceSlice';

export default function NewServicePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    division: 'Design & Build',
    startingPrice: '',
    pricingModel: 'Custom Turnkey Project',
    duration: '2 - 4 Weeks',
    status: 'Active',
    isFeatured: true,
    heroImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80&auto=format&fit=crop',
    shortDescription: '',
    longDescription: '',
    highlightsText: '3D Architectural Master Planning\nDubai Municipality & Developer NOC Approvals\n12-Month Warranty on Installed Flora',
    metaTitle: '',
    metaDescription: ''
  });

  const [subServices, setSubServices] = useState([
    {
      id: `sub-${Date.now()}`,
      title: '',
      slug: '',
      startingPrice: '',
      description: ''
    }
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const handleTitleChange = (val) => {
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setFormData({ ...formData, title: val, slug: generatedSlug });
  };

  const handleAddSubService = () => {
    setSubServices([
      ...subServices,
      {
        id: `sub-${Date.now()}-${Math.floor(Math.random() * 100)}`,
        title: '',
        slug: '',
        startingPrice: '',
        description: ''
      }
    ]);
  };

  const handleRemoveSubService = (subId) => {
    setSubServices(subServices.filter((s) => s.id !== subId));
  };

  const handleSubServiceChange = (subId, field, value) => {
    setSubServices(
      subServices.map((s) => {
        if (s.id !== subId) return s;
        const updated = { ...s, [field]: value };
        if (field === 'title') {
          updated.slug = value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
        }
        return updated;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const highlights = formData.highlightsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const cleanedSubServices = subServices
      .filter((s) => s.title.trim() !== '')
      .map((s) => ({
        ...s,
        startingPrice: Number(s.startingPrice) || 0
      }));

    const payload = {
      title: formData.title,
      slug: formData.slug,
      division: formData.division,
      startingPrice: Number(formData.startingPrice) || 0,
      pricingModel: formData.pricingModel,
      duration: formData.duration,
      status: formData.status,
      isFeatured: formData.isFeatured,
      heroImage: formData.heroImage,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      highlights,
      subServices: cleanedSubServices,
      metaTitle: formData.metaTitle || `${formData.title} Dubai | Royal Plantscape`,
      metaDescription: formData.metaDescription || formData.shortDescription
    };

    dispatch(addService(payload));
    setIsSaved(true);

    setTimeout(() => {
      router.push('/dashboard/services');
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/services"
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" /> New Service Pillar
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Landscaping Service</h1>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Created!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Publish Service
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Primary Service Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bespoke Villa Landscaping"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">URL Route Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="landscaping-services"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-mono text-emerald-700 font-bold focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Operating Division</label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                >
                  <option value="Design & Build">Design & Build</option>
                  <option value="Civil & Structural">Civil & Structural</option>
                  <option value="Care & Maintenance">Care & Maintenance</option>
                  <option value="MEP & Hydro-Tech">MEP & Hydro-Tech</option>
                  <option value="Aqua & Civil">Aqua & Civil</option>
                  <option value="Biophilic Interior">Biophilic Interior</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Estimated Project Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 3 - 6 Weeks"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Short Card Summary *</label>
              <textarea
                rows={2}
                required
                placeholder="Concise summary displayed on the main /services cards..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Detailed Landing Page Overview</label>
              <textarea
                rows={4}
                placeholder="Comprehensive description displayed on /services/[service]..."
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors resize-none"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-700" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Nested Sub-Services (/services/[service]/[subService])
                </h2>
              </div>
              <button
                type="button"
                onClick={handleAddSubService}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Sub-Service
              </button>
            </div>

            <div className="space-y-4">
              {subServices.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Sub-Service #{idx + 1}
                    </span>
                    {subServices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSubService(sub.id)}
                        className="text-rose-600 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sub-Service Title</label>
                      <input
                        type="text"
                        placeholder="e.g. 3D Landscape Design"
                        value={sub.title}
                        onChange={(e) => handleSubServiceChange(sub.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sub-Route Slug</label>
                      <input
                        type="text"
                        placeholder="landscape-design"
                        value={sub.slug}
                        onChange={(e) => handleSubServiceChange(sub.id, 'slug', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-emerald-700 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Starting Price (AED)</label>
                      <input
                        type="number"
                        placeholder="4500"
                        value={sub.startingPrice}
                        onChange={(e) => handleSubServiceChange(sub.id, 'startingPrice', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sub-Service Scope</label>
                    <input
                      type="text"
                      placeholder="Brief scope of work for this sub-service..."
                      value={sub.description}
                      onChange={(e) => handleSubServiceChange(sub.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">SEO & Search Metadata</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Meta Title</label>
                <input
                  type="text"
                  placeholder="e.g. Bespoke Villa Landscaping Services Dubai | Royal Plantscape"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Meta Description</label>
                <textarea
                  rows={2}
                  placeholder="Search engine snippet description for UAE homeowners..."
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors resize-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <DollarSign className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Pricing & Visibility</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Starting Price (AED) *</label>
                <input
                  type="number"
                  required
                  placeholder="25000"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pricing Model</label>
                <select
                  value={formData.pricingModel}
                  onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                >
                  <option value="Custom Turnkey Project">Custom Turnkey Project</option>
                  <option value="Per Sqm / Project">Per Sqm / Project</option>
                  <option value="Monthly AMC Contract">Monthly AMC Contract</option>
                  <option value="Fixed System Quote">Fixed System Quote</option>
                  <option value="Purchase or Monthly Rental">Purchase or Monthly Rental</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Publishing Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                >
                  <option value="Active">Active (Live on Navbar & Pages)</option>
                  <option value="Draft">Draft (Hidden)</option>
                  <option value="Seasonal">Seasonal Offering</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-800">Highlight on Home Page</span>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ImageIcon className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Hero Banner Image</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] text-emerald-800 font-bold border border-slate-200 shadow-sm">
                  Hero Banner Preview
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ListChecks className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Service Highlights</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Bullet Points (One per line)
              </label>
              <textarea
                rows={4}
                value={formData.highlightsText}
                onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors resize-none"
              />
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}