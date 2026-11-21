import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeframe: 'year',
  metricsByTimeframe: {
    week: {
      revenue: 'AED 48,200',
      revenueChange: '+14.2%',
      activeProjects: '18 Villas',
      projectsChange: '+4 new',
      storeOrders: '64 Orders',
      ordersChange: '+21.5%',
      consultations: '29 Leads',
      consultationsChange: '+19.0%',
    },
    month: {
      revenue: 'AED 194,800',
      revenueChange: '+22.8%',
      activeProjects: '34 Villas',
      projectsChange: '+9 new',
      storeOrders: '248 Orders',
      ordersChange: '+16.4%',
      consultations: '112 Leads',
      consultationsChange: '+24.1%',
    },
    year: {
      revenue: 'AED 1,420,500',
      revenueChange: '+31.6%',
      activeProjects: '128 Projects',
      projectsChange: '+18.4%',
      storeOrders: '1,842 Orders',
      ordersChange: '+27.9%',
      consultations: '640 Leads',
      consultationsChange: '+35.2%',
    },
  },
  revenueChart: [
    { month: 'Jan', revenue: 78000, target: 65000, leads: 42 },
    { month: 'Feb', revenue: 92000, target: 75000, leads: 51 },
    { month: 'Mar', revenue: 115000, target: 90000, leads: 64 },
    { month: 'Apr', revenue: 108000, target: 95000, leads: 58 },
    { month: 'May', revenue: 134000, target: 110000, leads: 76 },
    { month: 'Jun', revenue: 149000, target: 120000, leads: 85 },
    { month: 'Jul', revenue: 168000, target: 135000, leads: 94 },
    { month: 'Aug', revenue: 194800, target: 150000, leads: 112 },
  ],
  serviceBreakdown: [
    { name: 'Villa Landscaping', share: 38, amount: 'AED 539,790', color: '#10b981' },
    { name: 'Swimming Pool & Water Features', share: 26, amount: 'AED 369,330', color: '#059669' },
    { name: 'Green Walls & Indoor Plants', share: 18, amount: 'AED 255,690', color: '#34d399' },
    { name: 'Pergolas & Hardscaping', share: 11, amount: 'AED 156,255', color: '#6ee7b7' },
    { name: 'Smart Irrigation & AMC', share: 7, amount: 'AED 99,435', color: '#a7f3d0' },
  ],
  recentOrders: [
    {
      id: 'ORD-9401',
      client: 'Sheikh Hamdan Villa',
      area: 'Palm Jumeirah Frond G',
      service: 'Turnkey Villa & Infinity Pool Landscaping',
      amount: 'AED 145,000',
      status: 'In Progress',
      date: 'Today, 11:30 AM',
      priority: 'VIP',
    },
    {
      id: 'ORD-9400',
      client: 'Emaar Hospitality Group',
      area: 'Downtown Dubai',
      service: 'Preserved Moss Wall & Lobby Plantscaping',
      amount: 'AED 42,500',
      status: 'Completed',
      date: 'Yesterday',
      priority: 'Commercial',
    },
    {
      id: 'ORD-9399',
      client: 'Dr. Sofia Al-Ghurair',
      area: 'Dubai Hills Estate',
      service: 'Motorized Louvered Pergola & Outdoor Kitchen',
      amount: 'AED 68,000',
      status: 'In Progress',
      date: '21 Jul 2025',
      priority: 'High',
    },
    {
      id: 'ORD-9398',
      client: 'Jonathan Sterling',
      area: 'Arabian Ranches 2',
      service: 'Smart Drip Irrigation & Natural Grass Install',
      amount: 'AED 19,400',
      status: 'Pending',
      date: '20 Jul 2025',
      priority: 'Standard',
    },
    {
      id: 'ORD-9397',
      client: 'Alserkal Art Foundation',
      area: 'Al Quoz',
      service: '14x Fiddle Leaf Fig & Olive Trees Bundle',
      amount: 'AED 11,200',
      status: 'Completed',
      date: '19 Jul 2025',
      priority: 'Store Order',
    },
  ],
  recentInquiries: [
    {
      id: 'INQ-301',
      name: 'Rashid Al-Habtoor',
      phone: '+971 50 892 4410',
      area: 'Jumeirah Bay Island',
      service: 'Full Villa Landscape Architecture',
      budget: 'AED 250,000+',
      time: '14 mins ago',
      unread: true,
    },
    {
      id: 'INQ-302',
      name: 'Victoria Kensington',
      phone: '+971 58 219 3301',
      area: 'Emirates Hills',
      service: 'Swimming Pool Waterfall Renovation',
      budget: 'AED 85,000',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 'INQ-303',
      name: 'DIFC Tech Hub',
      phone: '+971 52 741 9002',
      area: 'Business Bay',
      service: 'Annual Indoor Plant Maintenance AMC',
      budget: 'AED 24,000/yr',
      time: '5 hours ago',
      unread: false,
    },
  ],
  notifications: [
    {
      id: 'not-1',
      title: 'VIP Consultation Request',
      desc: 'Rashid Al-Habtoor requested a site visit in Jumeirah Bay.',
      time: '14m ago',
      read: false,
    },
    {
      id: 'not-2',
      title: 'Milestone Payment Received',
      desc: 'AED 72,500 received for Order #ORD-9401 (Palm Jumeirah).',
      time: '1h ago',
      read: false,
    },
    {
      id: 'not-3',
      title: 'Low Nursery Stock Alert',
      desc: 'Mature Olive Trees (2.5m) dropped below 5 units in Al Quoz.',
      time: '4h ago',
      read: false,
    },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeframe: (state, action) => {
      state.timeframe = action.payload;
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
    },
    markInquiryRead: (state, action) => {
      const item = state.recentInquiries.find((i) => i.id === action.payload);
      if (item) item.unread = false;
    },
  },
});

export const {
  setTimeframe,
  markAllNotificationsRead,
  markInquiryRead,
} = dashboardSlice.actions;

export const selectDashboard = (state) => state.dashboard;

export default dashboardSlice.reducer;