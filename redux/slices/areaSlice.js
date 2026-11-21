import { createSlice } from '@reduxjs/toolkit';

const initialAreas = [
  {
    id: 'ZONE-DXB-01',
    name: 'Emirates Hills & Montgomerie',
    emirate: 'Dubai',
    sectorCode: 'EH-SEC-A/P',
    status: 'Active Operations',
    activeContractsCount: 18,
    leadEngineers: ['Eng. Tariq Al-Mansoor', 'Youssef El-Hassan'],
    propertyTypes: ['Royal Palaces', 'Private Luxury Estates'],
    waterPermitStatus: 'DEWA & Greywater Certified',
    avgProjectBudget: 'AED 180,000',
    description: 'Premier ultra-luxury residential community featuring expansive lawn turf, date palm groves, and automated drip irrigation systems.',
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ZONE-DXB-02',
    name: 'Palm Jumeirah Fronds & Crescent',
    emirate: 'Dubai',
    sectorCode: 'PJ-FROND-A-N',
    status: 'Active Operations',
    activeContractsCount: 24,
    leadEngineers: ['Ahmad Farooq', 'Zaid Naim'],
    propertyTypes: ['Beachfront Villas', 'Resort Penthouses'],
    waterPermitStatus: 'Nakheel Marine & Coastal Compliant',
    avgProjectBudget: 'AED 220,000',
    description: 'Beachfront coastal landscaping with saltwater-tolerant flora, specimen bougainvillea, and custom infinity pool surround greening.',
    coverImage: 'https://images.unsplash.com/photo-1545165375-7c5f3e738034?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ZONE-DXB-03',
    name: 'Jumeirah Golf Estates & Victory Heights',
    emirate: 'Dubai',
    sectorCode: 'JGE-EARTH-FIRE',
    status: 'Active Operations',
    activeContractsCount: 14,
    leadEngineers: ['Bilal Mustafa'],
    propertyTypes: ['Golf Course Villas', 'Private Mansions'],
    waterPermitStatus: 'DEWA Approved',
    avgProjectBudget: 'AED 150,000',
    description: 'Fairway-facing estate gardens, bioclimatic pergolas, natural sandstone paving, and automated smart turf management.',
    coverImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ZONE-DXB-04',
    name: 'Al Barari Sanctuary & Reserves',
    emirate: 'Dubai',
    sectorCode: 'AB-JASMINE-LEAF',
    status: 'Active Operations',
    activeContractsCount: 11,
    leadEngineers: ['Faisal Farooq'],
    propertyTypes: ['Botanical Sanctuary Villas'],
    waterPermitStatus: 'Organic Eco-Soil Certified',
    avgProjectBudget: 'AED 210,000',
    description: 'Dense tropical botanical micro-climates, hydroponic water walls, and rare indoor/outdoor exotic specimen plant care.',
    coverImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ZONE-DXB-05',
    name: 'Dubai Hills Estate & Sidra',
    emirate: 'Dubai',
    sectorCode: 'DHE-SIDRA-PARK',
    status: 'Active Operations',
    activeContractsCount: 16,
    leadEngineers: ['Karim Hassan'],
    propertyTypes: ['Modern Family Villas', 'Parks & Plazas'],
    waterPermitStatus: 'Emaar Master Plan Compliant',
    avgProjectBudget: 'AED 95,000',
    description: 'Contemporary minimalist garden designs, smart subterranean drip networks, and low-maintenance native desert flora.',
    coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ZONE-DXB-06',
    name: 'Downtown Dubai & DIFC Towers',
    emirate: 'Dubai',
    sectorCode: 'DT-DIFC-HQ',
    status: 'Limited Coverage',
    activeContractsCount: 9,
    leadEngineers: ['Eng. Sarah Jenkins'],
    propertyTypes: ['Corporate Plazas', 'Penthouse Sky Gardens'],
    waterPermitStatus: 'RTA & Municipality Approved',
    avgProjectBudget: 'AED 130,000',
    description: 'Vertical hydroponic living green walls, indoor air-purifying office plants, and high-rise balcony container gardens.',
    coverImage: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=1000&auto=format&fit=crop'
  }
];

const initialState = {
  areas: initialAreas,
  filters: {
    search: '',
    status: 'all'
  },
  selectedArea: null
};

const areaSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.search = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    resetFilters: (state) => {
      state.filters = { search: '', status: 'all' };
    },
    setSelectedArea: (state, action) => {
      state.selectedArea = action.payload;
    },
    addArea: (state, action) => {
      state.areas.unshift(action.payload);
    },
    updateArea: (state, action) => {
      const index = state.areas.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.areas[index] = { ...state.areas[index], ...action.payload };
      }
    },
    deleteArea: (state, action) => {
      state.areas = state.areas.filter((a) => a.id !== action.payload);
      if (state.selectedArea && state.selectedArea.id === action.payload) {
        state.selectedArea = null;
      }
    }
  }
});

export const {
  setSearchQuery,
  setStatusFilter,
  resetFilters,
  setSelectedArea,
  addArea,
  updateArea,
  deleteArea
} = areaSlice.actions;

export const selectAreas = (state) => state.areas.areas;
export const selectAreaFilters = (state) => state.areas.filters;
export const selectSelectedArea = (state) => state.areas.selectedArea;

export default areaSlice.reducer;