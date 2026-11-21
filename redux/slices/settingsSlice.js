import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyProfile: {
    companyName: 'The Maple Landscaping & Royal Plantscape LLC',
    licenseNumber: 'CN-2025-998811',
    trnNumber: '100456789000003',
    email: 'admin@maplelandscaping.ae',
    phone: '+971 4 333 8899',
    supportHotline: '+971 50 112 9988',
    headquarters: 'Building 4, Al Serkal Avenue, Al Quoz 1, Dubai, UAE',
    currency: 'AED',
    vatRate: 5
  },
  notifications: {
    emailVipLeads: true,
    smsHighValueOrders: true,
    weeklyExecutiveDigest: true,
    lowStockAlerts: true,
    surveyReminderHours: 24
  },
  security: {
    require2FA: true,
    sessionTimeoutMinutes: 60,
    restrictIpAccess: false,
    allowedIps: '192.168.1.1, 10.0.0.45'
  },
  pricingRules: {
    minContractValue: 5000,
    defaultPaymentTerms: '50% Upfront Deposit, 50% Final Handover',
    enableAutoInvoicing: true,
    acceptedGateways: ['Visa / Mastercard', 'Apple Pay', 'Bank Wire Transfer', 'Corporate Cheque']
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateCompanyProfile: (state, action) => {
      state.companyProfile = { ...state.companyProfile, ...action.payload };
    },
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateSecurity: (state, action) => {
      state.security = { ...state.security, ...action.payload };
    },
    updatePricingRules: (state, action) => {
      state.pricingRules = { ...state.pricingRules, ...action.payload };
    }
  }
});

export const {
  updateCompanyProfile,
  updateNotifications,
  updateSecurity,
  updatePricingRules
} = settingsSlice.actions;

export const selectCompanyProfile = (state) => state.settings.companyProfile;
export const selectNotificationSettings = (state) => state.settings.notifications;
export const selectSecuritySettings = (state) => state.settings.security;
export const selectPricingRules = (state) => state.settings.pricingRules;

export default settingsSlice.reducer;