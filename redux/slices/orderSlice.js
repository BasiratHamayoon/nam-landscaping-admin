import { createSlice } from '@reduxjs/toolkit';

const initialOrders = [
  {
    id: 'ORD-2025-8842',
    customerName: 'H.E. Sheikh Rashid Al Maktoum Estate',
    contactPerson: 'Eng. Faisal Al-Sabah',
    email: 'estates@sheikhrashid.ae',
    phone: '+971 50 112 9988',
    type: 'Service Contract',
    serviceTitle: 'Annual Villa Landscape & Turf Maintenance',
    location: 'Emirates Hills, Sector E, Villa 14, Dubai',
    totalAmount: 145000,
    paidAmount: 145000,
    currency: 'AED',
    orderDate: '2025-02-18',
    status: 'Active Contract',
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Wire Transfer',
    projectManager: 'Eng. Tariq Al-Mansoor',
    leadEngineer: 'Youssef El-Hassan',
    milestone: 'Phase 2: Automated Drip Irrigation & Soil Enrichment',
    completionPercentage: 45,
    items: [
      { id: 'item-1', name: 'Custom Canary Date Palm Installation (x4)', category: 'Trees & Palms', price: 48000, quantity: 1, total: 48000 },
      { id: 'item-2', name: 'Automated Hunter Smart Irrigation Controller', category: 'Irrigation', price: 22000, quantity: 1, total: 22000 },
      { id: 'item-3', name: 'Royal Italian Terrazzo Stepping Stones (80m²)', category: 'Hardscaping', price: 35000, quantity: 1, total: 35000 },
      { id: 'item-4', name: '12-Month Organic Turf & Palm Nutrition Plan', category: 'Maintenance', price: 40000, quantity: 1, total: 40000 }
    ],
    timeline: [
      { date: '2025-02-18 09:30', status: 'Contract Signed', note: 'VIP Contract executed with 100% upfront wire transfer.' },
      { date: '2025-02-19 11:00', status: 'Site Survey Completed', note: 'Engineers verified soil conductivity and hydraulic pressure.' },
      { date: '2025-02-21 14:15', status: 'Active Contract', note: 'Phase 1 Canary Date Palms delivered and positioned.' }
    ],
    notes: [
      { id: 'n-1', author: 'Eng. Tariq Al-Mansoor', date: '2025-02-20', text: 'Client requested low-noise equipment for morning lawn mowing.' }
    ]
  },
  {
    id: 'ORD-2025-8841',
    customerName: 'Dr. Mariam Al-Qasimi',
    contactPerson: 'Dr. Mariam Al-Qasimi',
    email: 'm.qasimi@dhcc.ae',
    phone: '+971 55 432 1098',
    type: 'E-Commerce Purchase',
    serviceTitle: 'Luxury Indoor Specimen Plant Procurement',
    location: 'Palm Jumeirah, Frond M, Villa 22, Dubai',
    totalAmount: 18450,
    paidAmount: 18450,
    currency: 'AED',
    orderDate: '2025-02-19',
    status: 'In Progress',
    paymentStatus: 'Paid',
    paymentMethod: 'Visa / Credit Card',
    projectManager: 'Zaid Naim',
    leadEngineer: 'Ahmad Farooq',
    milestone: 'White-Glove Delivery & Pot Placement',
    completionPercentage: 70,
    items: [
      { id: 'item-10', name: 'Specimen Bonsai Ficus Microcarpa (120cm)', category: 'Indoor Plants', price: 6200, quantity: 1, total: 6200 },
      { id: 'item-11', name: 'Hand-Carved Volcanic Basalt Planter Pot', category: 'Planters', price: 4250, quantity: 2, total: 8500 },
      { id: 'item-12', name: 'Soil Master Organic Compost Mix 500L', category: 'Soil & Care', price: 3750, quantity: 1, total: 3750 }
    ],
    timeline: [
      { date: '2025-02-19 14:00', status: 'Order Placed', note: 'Paid via Visa online store payment gateway.' },
      { date: '2025-02-20 08:30', status: 'In Progress', note: 'Plant specimen inspected and quarantined at nursery.' }
    ],
    notes: [
      { id: 'n-2', author: 'Zaid Naim', date: '2025-02-19', text: 'Access clearance approved by Nakheel Security for Palm Frond M.' }
    ]
  },
  {
    id: 'ORD-2025-8839',
    customerName: 'Al Serkal Avenue Art District',
    contactPerson: 'Kareem Abdelrahman (Facilities Dir)',
    email: 'facilities@alserkal.ae',
    phone: '+971 4 333 8900',
    type: 'Service Contract',
    serviceTitle: 'Biophilic Hydroponic Living Wall Installation',
    location: 'Warehouse 42, Al Quoz Industrial 1, Dubai',
    totalAmount: 89000,
    paidAmount: 44500,
    currency: 'AED',
    orderDate: '2025-02-15',
    status: 'Pending Approval',
    paymentStatus: 'Deposit Paid',
    paymentMethod: 'Corporate Cheque',
    projectManager: 'Eng. Sarah Jenkins',
    leadEngineer: 'Sanjay Kumar',
    milestone: 'Awaiting Structural Load Sign-Off',
    completionPercentage: 15,
    items: [
      { id: 'item-20', name: 'Biophilic Hydroponic Living Wall (18m²)', category: 'Vertical Gardens', price: 65000, quantity: 1, total: 65000 },
      { id: 'item-21', name: 'Full-Spectrum LED Grow Lighting System', category: 'Lighting', price: 14000, quantity: 1, total: 14000 },
      { id: 'item-22', name: 'Quarterly Plant Guarantee Maintenance Contract', category: 'Maintenance', price: 10000, quantity: 1, total: 10000 }
    ],
    timeline: [
      { date: '2025-02-15 16:20', status: 'Pending Approval', note: '50% deposit cheque deposited. Awaiting final architectural approval.' }
    ],
    notes: []
  },
  {
    id: 'ORD-2025-8835',
    customerName: 'Downtown Luxury Penthouse',
    contactPerson: 'Elena Rostova',
    email: 'elena.rostova@gmail.com',
    phone: '+971 52 887 6621',
    type: 'E-Commerce Purchase',
    serviceTitle: 'Balcony Evergreen Topiary & Planters',
    location: 'Downtown Dubai, Boulevard Point, Unit 4501',
    totalAmount: 9200,
    paidAmount: 9200,
    currency: 'AED',
    orderDate: '2025-02-12',
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'Apple Pay',
    projectManager: 'Karim Hassan',
    leadEngineer: 'Karim Hassan',
    milestone: 'Contract Completed & Handed Over',
    completionPercentage: 100,
    items: [
      { id: 'item-30', name: 'Monstera Deliciosa XXL Specimen', category: 'Indoor Plants', price: 2800, quantity: 1, total: 2800 },
      { id: 'item-31', name: 'Self-Watering Italian Terracotta Planters', category: 'Planters', price: 1100, quantity: 4, total: 4400 },
      { id: 'item-32', name: 'White Marble Gravel Pebbles (200kg)', category: 'Mulch & Stones', price: 2000, quantity: 1, total: 2000 }
    ],
    timeline: [
      { date: '2025-02-12 10:15', status: 'Order Placed', note: 'Payment processed via Apple Pay.' },
      { date: '2025-02-13 14:00', status: 'In Progress', note: 'Loaded on climate-controlled delivery truck.' },
      { date: '2025-02-14 11:30', status: 'Completed', note: 'Delivered and set up on 45th floor terrace with client sign-off.' }
    ],
    notes: [
      { id: 'n-3', author: 'Karim Hassan', date: '2025-02-14', text: 'Client was extremely satisfied and asked for seasonal floral updates.' }
    ]
  },
  {
    id: 'ORD-2025-8830',
    customerName: 'Jumeirah Golf Estates Villa',
    contactPerson: 'Alexander Miller',
    email: 'a.miller@jge-owners.ae',
    phone: '+971 50 765 4321',
    type: 'Service Contract',
    serviceTitle: 'Bioclimatic Pergola & Submersible Fountain Installation',
    location: 'Earth Course Villa 88, Jumeirah Golf Estates, Dubai',
    totalAmount: 210000,
    paidAmount: 105000,
    currency: 'AED',
    orderDate: '2025-02-05',
    status: 'Active Contract',
    paymentStatus: 'Partial',
    paymentMethod: 'Bank Wire Transfer',
    projectManager: 'Eng. Tariq Al-Mansoor',
    leadEngineer: 'Bilal Mustafa',
    milestone: 'Phase 3: Fountain Plumbing & Natural Sandstone Paving',
    completionPercentage: 60,
    items: [
      { id: 'item-40', name: 'Custom Aluminum Bioclimatic Pergola (6x4m)', category: 'Hardscaping', price: 120000, quantity: 1, total: 120000 },
      { id: 'item-41', name: 'Submersible LED Architectural Water Feature', category: 'Water Features', price: 45000, quantity: 1, total: 45000 },
      { id: 'item-42', name: 'Natural Sandstone Paving & Integrated Lighting', category: 'Hardscaping', price: 45000, quantity: 1, total: 45000 }
    ],
    timeline: [
      { date: '2025-02-05 09:00', status: 'Contract Signed', note: '50% initial payment received.' },
      { date: '2025-02-10 11:00', status: 'Active Contract', note: 'Pergola aluminum frame structure erected.' }
    ],
    notes: []
  },
  {
    id: 'ORD-2025-8822',
    customerName: 'Dubai Hills Residence',
    contactPerson: 'Noura Al-Hajri',
    email: 'noura.hajri@hotmail.com',
    phone: '+971 55 990 0112',
    type: 'E-Commerce Purchase',
    serviceTitle: 'Bougainvillea Glabra Trees & Fertilisers',
    location: 'Sidra 2, Villa 112, Dubai Hills, Dubai',
    totalAmount: 4600,
    paidAmount: 0,
    currency: 'AED',
    orderDate: '2025-01-28',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    paymentMethod: 'Mastercard',
    projectManager: 'Unassigned',
    leadEngineer: 'Unassigned',
    milestone: 'Cancelled by Customer',
    completionPercentage: 0,
    items: [
      { id: 'item-50', name: 'Bougainvillea Glabra Specimen Tree', category: 'Trees & Palms', price: 3200, quantity: 1, total: 3200 },
      { id: 'item-51', name: 'Organic Soil & Liquid Fertilisers Package', category: 'Soil & Care', price: 1400, quantity: 1, total: 1400 }
    ],
    timeline: [
      { date: '2025-01-28 15:45', status: 'Order Placed', note: 'Customer placed order online.' },
      { date: '2025-01-29 09:10', status: 'Cancelled', note: 'Customer requested cancellation due to travel schedule change.' }
    ],
    notes: []
  }
];

const initialState = {
  orders: initialOrders,
  filters: {
    search: '',
    type: 'all',
    status: 'all',
    paymentStatus: 'all'
  },
  selectedOrder: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.search = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setPaymentStatusFilter: (state, action) => {
      state.filters.paymentStatus = action.payload;
    },
    resetFilters: (state) => {
      state.filters = { search: '', type: 'all', status: 'all', paymentStatus: 'all' };
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { id, status, note, milestone, completionPercentage } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.status = status;
        if (milestone) order.milestone = milestone;
        if (typeof completionPercentage === 'number') order.completionPercentage = completionPercentage;
        order.timeline.unshift({
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: status,
          note: note || `Status updated to ${status}`
        });
        if (state.selectedOrder && state.selectedOrder.id === id) {
          state.selectedOrder = { ...order };
        }
      }
    },
    updatePaymentStatus: (state, action) => {
      const { id, paymentStatus, paidAmount } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.paymentStatus = paymentStatus;
        if (typeof paidAmount === 'number') {
          order.paidAmount = paidAmount;
        }
        if (state.selectedOrder && state.selectedOrder.id === id) {
          state.selectedOrder = { ...order };
        }
      }
    },
    assignProjectManager: (state, action) => {
      const { id, projectManager, leadEngineer } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        if (projectManager) order.projectManager = projectManager;
        if (leadEngineer) order.leadEngineer = leadEngineer;
        if (state.selectedOrder && state.selectedOrder.id === id) {
          state.selectedOrder = { ...order };
        }
      }
    },
    addOrderNote: (state, action) => {
      const { id, text, author } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        const newNote = {
          id: `n-${Date.now()}`,
          author: author || 'Admin',
          date: new Date().toISOString().split('T')[0],
          text
        };
        order.notes.unshift(newNote);
        if (state.selectedOrder && state.selectedOrder.id === id) {
          state.selectedOrder = { ...order };
        }
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
      if (state.selectedOrder && state.selectedOrder.id === action.payload) {
        state.selectedOrder = null;
      }
    }
  }
});

export const {
  setSearchQuery,
  setTypeFilter,
  setStatusFilter,
  setPaymentStatusFilter,
  resetFilters,
  setSelectedOrder,
  updateOrderStatus,
  updatePaymentStatus,
  assignProjectManager,
  addOrderNote,
  deleteOrder
} = orderSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectOrderFilters = (state) => state.orders.filters;
export const selectSelectedOrder = (state) => state.orders.selectedOrder;

export default orderSlice.reducer;