'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCompanyProfile,
  selectNotificationSettings,
  selectSecuritySettings,
  selectPricingRules,
  updateCompanyProfile,
  updateNotifications,
  updateSecurity,
  updatePricingRules
} from '@/redux/slices/settingsSlice';
import {
  Building2,
  Bell,
  ShieldCheck,
  CreditCard,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  AlertCircle,
  FileText,
  Key,
  Users,
  Smartphone
} from 'lucide-react';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const companyProfile = useSelector(selectCompanyProfile) || {};
  const notifications = useSelector(selectNotificationSettings) || {};
  const security = useSelector(selectSecuritySettings) || {};
  const pricingRules = useSelector(selectPricingRules) || {};

  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileForm, setProfileForm] = useState(companyProfile);
  const [notificationForm, setNotificationForm] = useState(notifications);
  const [securityForm, setSecurityForm] = useState(security);
  const [pricingForm, setPricingForm] = useState(pricingRules);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(updateCompanyProfile(profileForm));
    triggerSuccess();
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    dispatch(updateNotifications(notificationForm));
    triggerSuccess();
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    dispatch(updateSecurity(securityForm));
    triggerSuccess();
  };

  const handleSavePricing = (e) => {
    e.preventDefault();
    dispatch(updatePricingRules(pricingForm));
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#07190e]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            System Control & Settings
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Configure company credentials, VAT tax compliance, notification triggers, and security controls.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Settings updated successfully
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm flex flex-wrap items-center gap-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-[#07190e] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" /> Company Profile & VAT
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'notifications'
              ? 'bg-[#07190e] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Bell className="w-4 h-4" /> Notification Alerts
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'pricing'
              ? 'bg-[#07190e] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <CreditCard className="w-4 h-4" /> Pricing & Invoicing
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'security'
              ? 'bg-[#07190e] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Security & Access
        </button>
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Corporate Entity & VAT Registration
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Official registration details displayed on generated UAE tax invoices and contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Registered Company Name
              </label>
              <input
                type="text"
                required
                value={profileForm.companyName}
                onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Commercial License Number
              </label>
              <input
                type="text"
                required
                value={profileForm.licenseNumber}
                onChange={(e) => setProfileForm({ ...profileForm, licenseNumber: e.target.value })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                UAE Tax Registration Number (TRN)
              </label>
              <input
                type="text"
                required
                value={profileForm.trnNumber}
                onChange={(e) => setProfileForm({ ...profileForm, trnNumber: e.target.value })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                UAE Standard VAT Rate (%)
              </label>
              <input
                type="number"
                required
                value={profileForm.vatRate}
                onChange={(e) => setProfileForm({ ...profileForm, vatRate: Number(e.target.value) })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Corporate Email Address
              </label>
              <input
                type="email"
                required
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Support & Emergency Hotline
              </label>
              <input
                type="text"
                required
                value={profileForm.supportHotline}
                onChange={(e) => setProfileForm({ ...profileForm, supportHotline: e.target.value })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Dubai Headquarters Address
            </label>
            <input
              type="text"
              required
              value={profileForm.headquarters}
              onChange={(e) => setProfileForm({ ...profileForm, headquarters: e.target.value })}
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#07190e] text-white text-xs font-semibold rounded-xl hover:bg-[#11381e] transition-colors"
            >
              <Save className="w-4 h-4" /> Save Profile Settings
            </button>
          </div>
        </form>
      )}

      {activeTab === 'notifications' && (
        <form onSubmit={handleSaveNotifications} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Operational Alert & Triggers
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage automatic notifications sent to senior engineers and executive managers.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Instant VIP Lead Alerts</h4>
                <p className="text-xs text-gray-500 mt-0.5">Send immediate email notifications when a high-priority villa lead is submitted.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationForm.emailVipLeads}
                onChange={(e) => setNotificationForm({ ...notificationForm, emailVipLeads: e.target.checked })}
                className="w-4 h-4 accent-[#07190e] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <h4 className="text-xs font-bold text-gray-900">SMS Alerts for High-Value Orders</h4>
                <p className="text-xs text-gray-500 mt-0.5">Alert project managers via SMS when an order exceeding AED 100,000 is placed.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationForm.smsHighValueOrders}
                onChange={(e) => setNotificationForm({ ...notificationForm, smsHighValueOrders: e.target.checked })}
                className="w-4 h-4 accent-[#07190e] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Weekly Executive Financial Digest</h4>
                <p className="text-xs text-gray-500 mt-0.5">Receive a Monday morning breakdown of contract closures and stock levels.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationForm.weeklyExecutiveDigest}
                onChange={(e) => setNotificationForm({ ...notificationForm, weeklyExecutiveDigest: e.target.checked })}
                className="w-4 h-4 accent-[#07190e] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Low Nursery Inventory Warning</h4>
                <p className="text-xs text-gray-500 mt-0.5">Trigger alert when specimen plant stock falls below minimum reorder thresholds.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationForm.lowStockAlerts}
                onChange={(e) => setNotificationForm({ ...notificationForm, lowStockAlerts: e.target.checked })}
                className="w-4 h-4 accent-[#07190e] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#07190e] text-white text-xs font-semibold rounded-xl hover:bg-[#11381e] transition-colors"
            >
              <Save className="w-4 h-4" /> Save Alert Settings
            </button>
          </div>
        </form>
      )}

      {activeTab === 'pricing' && (
        <form onSubmit={handleSavePricing} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Pricing Rules & Payment Terms
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Define minimum contract thresholds and approved billing gateways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Minimum Service Contract Threshold (AED)
              </label>
              <input
                type="number"
                value={pricingForm.minContractValue}
                onChange={(e) => setPricingForm({ ...pricingForm, minContractValue: Number(e.target.value) })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Default Contract Payment Milestone Schedule
              </label>
              <input
                type="text"
                value={pricingForm.defaultPaymentTerms}
                onChange={(e) => setPricingForm({ ...pricingForm, defaultPaymentTerms: e.target.value })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#07190e] text-white text-xs font-semibold rounded-xl hover:bg-[#11381e] transition-colors"
            >
              <Save className="w-4 h-4" /> Save Pricing Rules
            </button>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <form onSubmit={handleSaveSecurity} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Portal Security & Authentication Rules
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Enforce multi-factor authentication and session security policies.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Mandatory Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-gray-500 mt-0.5">Require mobile authenticator verification for all admin logins.</p>
              </div>
              <input
                type="checkbox"
                checked={securityForm.require2FA}
                onChange={(e) => setSecurityForm({ ...securityForm, require2FA: e.target.checked })}
                className="w-4 h-4 accent-[#07190e] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Inactivity Session Timeout (Minutes)
              </label>
              <select
                value={securityForm.sessionTimeoutMinutes}
                onChange={(e) => setSecurityForm({ ...securityForm, sessionTimeoutMinutes: Number(e.target.value) })}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07190e]"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={120}>120 Minutes</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#07190e] text-white text-xs font-semibold rounded-xl hover:bg-[#11381e] transition-colors"
            >
              <Save className="w-4 h-4" /> Save Security Policies
            </button>
          </div>
        </form>
      )}
    </div>
  );
}