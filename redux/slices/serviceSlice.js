'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pillars: [
    {
      id: 'pillar-1',
      title: 'Architectural Hardscaping',
      tagline: 'Custom pools, pergolas, travertine paving, and structural features',
      description: 'Engineering and building bespoke hardscapes tailored for Dubai climates, compliant with municipal codes.',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80',
      icon: 'Layers',
      status: 'Active'
    },
    {
      id: 'pillar-2',
      title: 'Softscaping & Botanical Curation',
      tagline: 'Exotic palms, specimen olive trees, turf, and irrigation',
      description: 'Lush green landscapes featuring drought-tolerant flora, automated drip irrigation, and soil enrichment.',
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80',
      icon: 'Sprout',
      status: 'Active'
    },
    {
      id: 'pillar-3',
      title: 'Commercial Landscape Contracts',
      tagline: 'Resorts, corporate compounds, and community groundskeeping',
      description: 'Turnkey grounds maintenance, seasonal flower rotation, water conservation, and tree pruning.',
      image: 'https://images.unsplash.com/photo-1545165375-7c5f3e738034?auto=format&fit=crop&q=80',
      icon: 'Building2',
      status: 'Active'
    }
  ],
  subServices: [
    {
      id: 'srv-101',
      title: 'Bespoke Villa Landscape Design & Build',
      pillarId: 'pillar-1',
      startingPrice: 45000,
      duration: '4 - 8 Weeks',
      warranty: '2 Years Structural Guarantee',
      description: 'Full end-to-end design, 3D render visualization, hardscape masonry, and planting for luxury Dubai villas.',
      features: ['3D CAD Concept Design', 'Travertine / Porcelain Paving', 'Automated Mood Lighting', 'Soil Prep & Irrigation'],
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'srv-102',
      title: 'Luxury Swimming Pools & Water Features',
      pillarId: 'pillar-1',
      startingPrice: 85000,
      duration: '6 - 10 Weeks',
      warranty: '5 Years Leakage & Tile Guarantee',
      description: 'Temperature-controlled overflow or infinity edge pools with mosaic tiling, water cascades, and sunken seating.',
      features: ['Chiller & Heater Units', 'Spanish Glass Mosaic', 'Saltwater Chlorination', 'Dubai Municipality Approvals'],
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'srv-103',
      title: 'Automated Smart Irrigation Systems',
      pillarId: 'pillar-2',
      startingPrice: 8500,
      duration: '3 - 5 Days',
      warranty: '1 Year Pump & Controller Guarantee',
      description: 'Precision drip lines, pop-up spray heads, soil moisture sensors, and Wi-Fi smart controllers.',
      features: ['Hunter / Rainbird Hardware', 'Weather-adaptive schedules', 'Sub-surface drip lines', 'Pressure regulation'],
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
      status: 'Active'
    }
  ],
  filters: {
    searchQuery: '',
    selectedDivision: 'All',
    selectedStatus: 'All',
    viewMode: 'grid'
  }
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addPillar: (state, action) => {
      state.pillars.unshift(action.payload);
    },
    updatePillar: (state, action) => {
      const index = state.pillars.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.pillars[index] = { ...state.pillars[index], ...action.payload };
      }
    },
    deletePillar: (state, action) => {
      state.pillars = state.pillars.filter((p) => p.id !== action.payload);
      state.subServices = state.subServices.filter((s) => s.pillarId !== action.payload);
    },
    addService: (state, action) => {
      state.subServices.unshift(action.payload);
    },
    updateService: (state, action) => {
      const index = state.subServices.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.subServices[index] = { ...state.subServices[index], ...action.payload };
      }
    },
    deleteService: (state, action) => {
      state.subServices = state.subServices.filter((s) => s.id !== action.payload);
    },
    addSubService: (state, action) => {
      state.subServices.unshift(action.payload);
    },
    updateSubService: (state, action) => {
      const index = state.subServices.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.subServices[index] = { ...state.subServices[index], ...action.payload };
      }
    },
    deleteSubService: (state, action) => {
      state.subServices = state.subServices.filter((s) => s.id !== action.payload);
    },
    setServiceSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setSelectedDivision: (state, action) => {
      state.filters.selectedDivision = action.payload;
    },
    setSelectedServiceStatus: (state, action) => {
      state.filters.selectedStatus = action.payload;
    },
    setServiceViewMode: (state, action) => {
      state.filters.viewMode = action.payload;
    },
    toggleServiceStatus: (state, action) => {
      const service = state.subServices.find((s) => s.id === action.payload);
      if (service) {
        service.status = service.status === 'Active' ? 'Paused' : 'Active';
      }
    }
  }
});

export const {
  addPillar,
  updatePillar,
  deletePillar,
  addService,
  updateService,
  deleteService,
  addSubService,
  updateSubService,
  deleteSubService,
  setServiceSearchQuery,
  setSelectedDivision,
  setSelectedServiceStatus,
  setServiceViewMode,
  toggleServiceStatus
} = serviceSlice.actions;

export const selectServices = (state) => state.services;
export const selectServiceFilters = (state) => state.services.filters || {
  searchQuery: '',
  selectedDivision: 'All',
  selectedStatus: 'All',
  viewMode: 'grid'
};

export default serviceSlice.reducer;