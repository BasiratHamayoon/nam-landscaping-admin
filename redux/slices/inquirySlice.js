import { createSlice } from '@reduxjs/toolkit';

const initialInquiries = [
  {
    id: 'INQ-2025-0101',
    clientName: 'H.E. Sheikh Majid Villa Estate',
    contactPerson: 'H.E. Sheikh Majid Al-Maktoum',
    email: 'estates.majid@royaloffice.ae',
    phone: '+971 50 888 1234',
    company: 'Majid Royal Holdings',
    serviceCategory: 'Villa Landscape Design',
    propertyType: 'Private Royal Villa',
    estimatedBudget: 'AED 500,000+',
    location: 'Emirates Hills, Sector P, Villa 01, Dubai',
    status: 'Consultation Scheduled',
    priority: 'VIP High',
    submittedAt: '2025-02-22 10:15',
    consultationDate: '2025-02-28 11:00 AM',
    assignedConsultant: 'Eng. Tariq Al-Mansoor',
    message: 'We are expanding our estate gardens with an Italian marble water feature, automated climate-controlled palm grove, and custom night LED illumination. Looking for a full turnkey landscape engineering proposal.',
    timeline: [
      { date: '2025-02-22 10:15', status: 'New Lead', note: 'VIP inquiry received via private web portal.' },
      { date: '2025-02-22 14:00', status: 'Contacted', note: 'Eng. Tariq called protocol office to verify site requirements.' },
      { date: '2025-02-23 09:30', status: 'Consultation Scheduled', note: 'Site survey meeting confirmed for Feb 28.' }
    ],
    notes: [
      { id: 'inq-n1', author: 'Eng. Tariq Al-Mansoor', date: '2025-02-22', text: 'Royal protocol security clearance paperwork submitted for engineering team access.' }
    ]
  },
  {
    id: 'INQ-2025-0102',
    clientName: 'Dr. Laila Al-Otaiba',
    contactPerson: 'Dr. Laila Al-Otaiba',
    email: 'laila.otaiba@clevelandclinic.ae',
    phone: '+971 55 234 5678',
    company: 'Individual',
    serviceCategory: 'Custom Swimming Pool',
    propertyType: 'Luxury Villa',
    estimatedBudget: 'AED 250,000 - 500,000',
    location: 'Palm Jumeirah, Frond N, Villa 18, Dubai',
    status: 'New Lead',
    priority: 'VIP High',
    submittedAt: '2025-02-24 16:45',
    consultationDate: '',
    assignedConsultant: 'Unassigned',
    message: 'Requesting a temperature-controlled infinity pool integration with natural basalt water cascading walls for our beachfront residence.',
    timeline: [
      { date: '2025-02-24 16:45', status: 'New Lead', note: 'Inquiry submitted online.' }
    ],
    notes: []
  },
  {
    id: 'INQ-2025-0103',
    clientName: 'Emirates Golf Club Executive Lounge',
    contactPerson: 'Kareem Abdelaziz (Operations Manager)',
    email: 'k.abdelaziz@dubaigolf.com',
    phone: '+971 4 380 8888',
    company: 'Dubai Golf Corporate',
    serviceCategory: 'Hydroponic Living Walls',
    propertyType: 'Commercial Complex',
    estimatedBudget: 'AED 100,000 - 250,000',
    location: 'Emirates Golf Club, Majlis Clubhouse, Dubai',
    status: 'Proposal Sent',
    priority: 'Medium',
    submittedAt: '2025-02-18 11:20',
    consultationDate: '2025-02-20 14:00 PM',
    assignedConsultant: 'Sarah Jenkins',
    message: 'Indoor biophilic air-purifying living plant walls for our newly renovated executive VIP member lounge.',
    timeline: [
      { date: '2025-02-18 11:20', status: 'New Lead', note: 'Corporate web lead received.' },
      { date: '2025-02-20 14:00', status: 'Consultation Scheduled', note: 'Site inspection completed by Sarah Jenkins.' },
      { date: '2025-02-22 15:30', status: 'Proposal Sent', note: 'Formal commercial proposal PR-882 sent via email.' }
    ],
    notes: [
      { id: 'inq-n2', author: 'Sarah Jenkins', date: '2025-02-21', text: 'Architectural drawings reviewed. Weight capacity verified for hydroponic frame.' }
    ]
  },
  {
    id: 'INQ-2025-0104',
    clientName: 'Al Barari Sanctuary Villa',
    contactPerson: 'Marcus & Elena Vance',
    email: 'm.vance@vanceholdings.co.uk',
    phone: '+971 52 911 0022',
    company: 'Individual',
    serviceCategory: 'Turf & Irrigation System',
    propertyType: 'Private Villa',
    estimatedBudget: 'AED 50,000 - 100,000',
    location: 'Al Barari, Jasmine Leaf, Villa 09, Dubai',
    status: 'Contacted',
    priority: 'Standard',
    submittedAt: '2025-02-21 09:10',
    consultationDate: '',
    assignedConsultant: 'Faisal Farooq',
    message: 'Upgrading existing grass lawn to organic hybrid Bermuda turf with automated smart rain sensors.',
    timeline: [
      { date: '2025-02-21 09:10', status: 'New Lead', note: 'Submitted lead form.' },
      { date: '2025-02-21 11:30', status: 'Contacted', note: 'Faisal Farooq spoke with client.' }
    ],
    notes: []
  },
  {
    id: 'INQ-2025-0105',
    clientName: 'Address Downtown Penthouse Sky Garden',
    contactPerson: 'Natalia Vodianova',
    email: 'n.vodianova@fashionmodels.fr',
    phone: '+971 56 777 4321',
    company: 'Individual',
    serviceCategory: 'Indoor Specimen Plants',
    propertyType: 'Penthouse / Balcony',
    estimatedBudget: 'AED 100,000 - 250,000',
    location: 'Downtown Dubai, Address Downtown, Floor 62',
    status: 'Contract Closed',
    priority: 'VIP High',
    submittedAt: '2025-02-10 14:00',
    consultationDate: '2025-02-12 10:00 AM',
    assignedConsultant: 'Eng. Tariq Al-Mansoor',
    message: 'Curated rare tropical specimen plants (Bonsai Ficus, Monstera Deliciosa XXL) and custom ceramic pots for private sky garden.',
    timeline: [
      { date: '2025-02-10 14:00', status: 'New Lead', note: 'High priority penthouse lead.' },
      { date: '2025-02-12 10:00', status: 'Consultation Scheduled', note: 'On-site penthouse walk-through completed.' },
      { date: '2025-02-14 16:00', status: 'Proposal Sent', note: 'Design render & quotation approved.' },
      { date: '2025-02-16 11:00', status: 'Contract Closed', note: 'Order ORD-2025-8835 created and paid.' }
    ],
    notes: [
      { id: 'inq-n3', author: 'Eng. Tariq Al-Mansoor', date: '2025-02-16', text: 'Successfully converted to active order.' }
    ]
  },
  {
    id: 'INQ-2025-0106',
    clientName: 'Jumeirah Beach Hotel Sunset Deck',
    contactPerson: 'Omar Al-Qasim (Events Dir)',
    email: 'events@jumeirah.com',
    phone: '+971 4 406 8888',
    company: 'Jumeirah Group',
    serviceCategory: 'Commercial Maintenance',
    propertyType: 'Hotel / Resort',
    estimatedBudget: 'AED 250,000 - 500,000',
    location: 'Jumeirah Beach Hotel, Jumeirah 2, Dubai',
    status: 'Archived / Lost',
    priority: 'Medium',
    submittedAt: '2025-01-15 11:00',
    consultationDate: '2025-01-18 15:00 PM',
    assignedConsultant: 'Sarah Jenkins',
    message: 'Seasonal floral displays and palm trimming contract for outdoor beachfront lounge areas.',
    timeline: [
      { date: '2025-01-15 11:00', status: 'New Lead', note: 'Inquiry received.' },
      { date: '2025-01-28 17:00', status: 'Archived / Lost', note: 'Client postponed budget cycle to Q4.' }
    ],
    notes: []
  }
];

const initialState = {
  inquiries: initialInquiries,
  filters: {
    search: '',
    category: 'all',
    status: 'all',
    priority: 'all'
  },
  selectedInquiry: null
};

const inquirySlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.filters.priority = action.payload;
    },
    resetFilters: (state) => {
      state.filters = { search: '', category: 'all', status: 'all', priority: 'all' };
    },
    setSelectedInquiry: (state, action) => {
      state.selectedInquiry = action.payload;
    },
    updateInquiryStatus: (state, action) => {
      const { id, status, note, consultationDate } = action.payload;
      const inquiry = state.inquiries.find((i) => i.id === id);
      if (inquiry) {
        inquiry.status = status;
        if (consultationDate) inquiry.consultationDate = consultationDate;
        inquiry.timeline.unshift({
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status,
          note: note || `Status updated to ${status}`
        });
        if (state.selectedInquiry && state.selectedInquiry.id === id) {
          state.selectedInquiry = { ...inquiry };
        }
      }
    },
    assignConsultant: (state, action) => {
      const { id, consultant } = action.payload;
      const inquiry = state.inquiries.find((i) => i.id === id);
      if (inquiry) {
        inquiry.assignedConsultant = consultant;
        if (state.selectedInquiry && state.selectedInquiry.id === id) {
          state.selectedInquiry = { ...inquiry };
        }
      }
    },
    addInquiryNote: (state, action) => {
      const { id, text, author } = action.payload;
      const inquiry = state.inquiries.find((i) => i.id === id);
      if (inquiry) {
        const newNote = {
          id: `inq-n-${Date.now()}`,
          author: author || 'Admin',
          date: new Date().toISOString().split('T')[0],
          text
        };
        inquiry.notes.unshift(newNote);
        if (state.selectedInquiry && state.selectedInquiry.id === id) {
          state.selectedInquiry = { ...inquiry };
        }
      }
    },
    deleteInquiry: (state, action) => {
      state.inquiries = state.inquiries.filter((i) => i.id !== action.payload);
      if (state.selectedInquiry && state.selectedInquiry.id === action.payload) {
        state.selectedInquiry = null;
      }
    }
  }
});

export const {
  setSearchQuery,
  setCategoryFilter,
  setStatusFilter,
  setPriorityFilter,
  resetFilters,
  setSelectedInquiry,
  updateInquiryStatus,
  assignConsultant,
  addInquiryNote,
  deleteInquiry
} = inquirySlice.actions;

export const selectInquiries = (state) => state.inquiries.inquiries;
export const selectInquiryFilters = (state) => state.inquiries.filters;
export const selectSelectedInquiry = (state) => state.inquiries.selectedInquiry;

export default inquirySlice.reducer;