import { createSlice } from '@reduxjs/toolkit';

const initialServices = [
  {
    id: 'srv-001',
    title: 'Bespoke Villa Landscaping',
    slug: 'landscaping-services',
    division: 'Design & Build',
    startingPrice: 25000,
    pricingModel: 'Custom Turnkey Project',
    duration: '3 - 6 Weeks',
    status: 'Active',
    isFeatured: true,
    activeContracts: 18,
    completedProjects: 145,
    rating: 4.9,
    heroImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80&auto=format&fit=crop',
    shortDescription: 'Complete luxury architectural landscape design and execution for Dubai villas, penthouses, and estates.',
    longDescription: 'Our Bespoke Villa Landscaping service transforms bare desert plots into lush, climate-resilient private sanctuaries across Emirates Hills, Palm Jumeirah, and Dubai Hills Estate. We handle 3D architectural rendering, municipality approvals, softscaping, and mature specimen installation.',
    highlights: [
      '3D Architectural Visualization & Master Planning',
      'Dubai Municipality & Developer NOC Approvals',
      'Heat-Tolerant Royal Palm & Olive Tree Sourcing',
      '12-Month Plant Establishment Warranty'
    ],
    subServices: [
      {
        id: 'sub-101',
        title: '3D Landscape Architecture & Design',
        slug: 'landscape-design',
        startingPrice: 4500,
        description: 'Photorealistic 3D walkthroughs, CAD grading plans, and botanical lighting layouts.'
      },
      {
        id: 'sub-102',
        title: 'Softscaping & Specimen Planting',
        slug: 'softscaping-planting',
        startingPrice: 12000,
        description: 'Supply and installation of mature palms, Mediterranean olive trees, and seasonal flora.'
      },
      {
        id: 'sub-103',
        title: 'Natural & Royal Artificial Turf Installation',
        slug: 'turf-installation',
        startingPrice: 3500,
        description: 'UV-stabilized 45mm luxury artificial grass and Bermuda natural lawn sodding.'
      }
    ],
    metaTitle: 'Bespoke Villa Landscaping Services Dubai | Royal Plantscape',
    metaDescription: 'Award-winning villa landscaping design and build contractors in Dubai. Custom 3D garden design, softscaping, and turnkey execution.'
  },
  {
    id: 'srv-002',
    title: 'Hardscaping & Outdoor Living',
    slug: 'hardscaping-outdoors',
    division: 'Civil & Structural',
    startingPrice: 18000,
    pricingModel: 'Per Sqm / Project',
    duration: '2 - 5 Weeks',
    status: 'Active',
    isFeatured: true,
    activeContracts: 12,
    completedProjects: 98,
    rating: 4.8,
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80&auto=format&fit=crop',
    shortDescription: 'Custom motorized bioclimatic pergolas, outdoor kitchens, sunken fire-pit lounges, and Italian porcelain paving.',
    longDescription: 'Engineered for the UAE outdoor lifestyle, our hardscaping division constructs architectural gazebos, travertine pool decks, WPC composite decking, and custom BBQ islands with weatherproof masonry.',
    highlights: [
      'Motorized Aluminum & Red Meranti Timber Pergolas',
      '20mm Italian Porcelain & Turkish Travertine Paving',
      'Sunken Majlis Seating with Gas Fire Pits',
      'Integrated Low-Voltage IP68 Landscape Lighting'
    ],
    subServices: [
      {
        id: 'sub-201',
        title: 'Custom Pergolas & Gazebos',
        slug: 'pergolas-gazebos',
        startingPrice: 15000,
        description: 'Bioclimatic aluminum louvered pergolas and treated hardwood garden shades.'
      },
      {
        id: 'sub-202',
        title: 'Patio Paving & WPC Decking',
        slug: 'patio-paving-decking',
        startingPrice: 8500,
        description: 'Heat-reflective stone pathways, interlocking tiles, and weatherproof composite decks.'
      },
      {
        id: 'sub-203',
        title: 'Outdoor Kitchens & BBQ Counters',
        slug: 'outdoor-kitchens-bbq',
        startingPrice: 22000,
        description: 'Built-in stainless steel grills, granite countertops, and outdoor bar seating.'
      }
    ],
    metaTitle: 'Hardscaping & Pergola Contractors Dubai | Royal Plantscape',
    metaDescription: 'Custom pergolas, gazebos, outdoor kitchens, and stone paving installation across Dubai villas.'
  },
  {
    id: 'srv-003',
    title: 'Annual Garden Maintenance (AMC)',
    slug: 'garden-maintenance',
    division: 'Care & Maintenance',
    startingPrice: 850,
    pricingModel: 'Monthly AMC Contract',
    duration: '12 Months (Weekly Visits)',
    status: 'Active',
    isFeatured: true,
    activeContracts: 84,
    completedProjects: 410,
    rating: 4.9,
    heroImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop',
    shortDescription: 'Scheduled weekly horticulture care, palm tree pruning, organic fertilization, and pest control across Dubai.',
    longDescription: 'Keep your landscape thriving through peak 50°C UAE summers with our dedicated horticultural maintenance teams. We provide scheduled weekly or bi-weekly visits including lawn mowing, hedge sculpting, soil aeration, and irrigation calibration.',
    highlights: [
      'Dedicated Uniformed Horticulturist Team',
      'Seasonal Petunia & Marigold Flowerbed Rotation',
      'Municipality-Approved Organic Pest & Red Palm Weevil Control',
      'Emergency 24-Hour Irrigation Leak Response'
    ],
    subServices: [
      {
        id: 'sub-301',
        title: 'Villa Annual Maintenance Contract (AMC)',
        slug: 'villa-amc-packages',
        startingPrice: 850,
        description: 'Comprehensive weekly garden maintenance, lawn care, and seasonal fertilizing.'
      },
      {
        id: 'sub-302',
        title: 'Palm Tree Trimming & Weevil Treatment',
        slug: 'palm-tree-care',
        startingPrice: 350,
        description: 'Crown cleaning, date frond pruning, and preventive trunk injection therapy.'
      }
    ],
    metaTitle: 'Annual Garden Maintenance Contracts Dubai | Villa AMC',
    metaDescription: 'Reliable weekly garden maintenance services in Dubai. Professional lawn care, tree pruning, and irrigation checks.'
  },
  {
    id: 'srv-004',
    title: 'Smart Irrigation & Water Systems',
    slug: 'irrigation-systems',
    division: 'MEP & Hydro-Tech',
    startingPrice: 4500,
    pricingModel: 'Fixed System Quote',
    duration: '3 - 7 Days',
    status: 'Active',
    isFeatured: false,
    activeContracts: 9,
    completedProjects: 215,
    rating: 4.9,
    heroImage: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80&auto=format&fit=crop',
    shortDescription: 'Automated WiFi weather-sensing drip irrigation, pop-up Hunter/RainBird sprinklers, and booster pump rooms.',
    longDescription: 'Engineered to reduce DEWA water bills by up to 45%, our automated irrigation networks deliver precise root-zone hydration adjusted automatically to Dubai humidity and temperature.',
    highlights: [
      'Hunter & RainBird Smart WiFi Controllers',
      'Sub-Surface Drip Lines for Zero Evaporation Loss',
      'High-Pressure Grundfos Booster Pump Installation',
      'Full Pipe Pressure Testing & Zone Mapping'
    ],
    subServices: [
      {
        id: 'sub-401',
        title: 'Automatic Drip & Pop-Up Sprinkler Network',
        slug: 'automatic-sprinklers',
        startingPrice: 4500,
        description: 'Multi-zone solenoid valve automation for lawns, hedges, and specimen trees.'
      },
      {
        id: 'sub-402',
        title: 'Smart WiFi Controller Upgrades',
        slug: 'smart-controller-retrofit',
        startingPrice: 1650,
        description: 'Upgrade legacy timers to smartphone-controlled weather-sync irrigation hubs.'
      }
    ],
    metaTitle: 'Smart Automatic Irrigation Systems Dubai | Royal Plantscape',
    metaDescription: 'DEWA water-saving automatic drip and sprinkler irrigation installation and repair in Dubai.'
  },
  {
    id: 'srv-005',
    title: 'Swimming Pools & Water Features',
    slug: 'swimming-pool-water-features',
    division: 'Aqua & Civil',
    startingPrice: 65000,
    pricingModel: 'Custom Engineering Quote',
    duration: '6 - 10 Weeks',
    status: 'Active',
    isFeatured: true,
    activeContracts: 7,
    completedProjects: 54,
    rating: 5.0,
    heroImage: 'https://images.unsplash.com/photo-1519955266818-0231b63402b2?w=800&q=80&auto=format&fit=crop',
    shortDescription: 'Infinity edge temperature-controlled swimming pools, Zen koi ponds, and corten steel waterfall walls.',
    longDescription: 'From luxury mosaic-tiled infinity pools to tranquil entrance water curtains, our aqua-engineering team handles excavation, waterproofing, chiller/heater integration, and salt-chlorination systems.',
    highlights: [
      'Reinforced Shotcrete Shell with 10-Year Structural Warranty',
      'Spanish Glass Mosaic & Bali Green Stone Finishes',
      'Heat-Pump Chiller & Heater Climate Control',
      'Automated Saltwater & UV Filtration Skimmers'
    ],
    subServices: [
      {
        id: 'sub-501',
        title: 'Custom Villa Swimming Pool Construction',
        slug: 'swimming-pool-construction',
        startingPrice: 65000,
        description: 'Turnkey infinity, overflow, and skimmer pools with sunken pool bars.'
      },
      {
        id: 'sub-502',
        title: 'Zen Waterfalls, Fountains & Koi Ponds',
        slug: 'water-features-fountains',
        startingPrice: 12500,
        description: 'Architectural sheer descent waterfalls, bio-filtered koi ponds, and reflection pools.'
      }
    ],
    metaTitle: 'Swimming Pool & Water Feature Contractors Dubai | Royal Plantscape',
    metaDescription: 'Custom luxury swimming pool design, construction, and decorative garden water features in Dubai.'
  },
  {
    id: 'srv-006',
    title: 'Corporate & Indoor Plantscaping',
    slug: 'indoor-landscaping',
    division: 'Biophilic Interior',
    startingPrice: 3500,
    pricingModel: 'Purchase or Monthly Rental',
    duration: '2 - 5 Days',
    status: 'Active',
    isFeatured: false,
    activeContracts: 31,
    completedProjects: 180,
    rating: 4.8,
    heroImage: 'https://images.unsplash.com/photo-1545165375-7c5f3e738034?w=800&q=80&auto=format&fit=crop',
    shortDescription: 'Living green walls, preserved moss installations, and luxury indoor plant rental for Dubai offices and hotels.',
    longDescription: 'Elevate indoor air quality and workplace aesthetics with our biophilic design solutions. We supply statement Ficus bonsai, self-watering terrazzo planters, and automated vertical hydroponic green walls.',
    highlights: [
      'Free Bi-Weekly Plant Replacement Guarantee on Rentals',
      'Automated Vertical Living Green Walls & Preserved Moss',
      'Custom Branded Fiberglass & Terrazzo Planters',
      'Low-Light Acclimated Tropical Specimen Selection'
    ],
    subServices: [
      {
        id: 'sub-601',
        title: 'Vertical Living Green Walls & Moss Art',
        slug: 'vertical-green-walls',
        startingPrice: 950,
        description: 'Hydroponic living plant walls and zero-maintenance preserved Scandinavian moss walls.'
      },
      {
        id: 'sub-602',
        title: 'Corporate Office Plant Rental & Care',
        slug: 'office-plant-rental',
        startingPrice: 1200,
        description: 'Monthly indoor plant leasing with scheduled watering, leaf polishing, and free replacements.'
      }
    ],
    metaTitle: 'Indoor Plantscaping & Green Walls Dubai | Office Plant Rental',
    metaDescription: 'Biophilic indoor landscaping, living vertical green walls, and corporate office plant rental in Dubai.'
  }
];

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    items: initialServices,
    searchQuery: '',
    selectedDivision: 'all',
    selectedStatus: 'all',
    viewMode: 'grid'
  },
  reducers: {
    setServiceSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedDivision: (state, action) => {
      state.selectedDivision = action.payload;
    },
    setSelectedServiceStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setServiceViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    addService: (state, action) => {
      const newService = {
        id: `srv-${Date.now()}`,
        activeContracts: 0,
        completedProjects: 0,
        rating: 5.0,
        ...action.payload
      };
      state.items.unshift(newService);
    },
    updateService: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteService: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleServiceStatus: (state, action) => {
      const service = state.items.find((item) => item.id === action.payload);
      if (service) {
        service.status = service.status === 'Active' ? 'Draft' : 'Active';
      }
    }
  }
});

export const {
  setServiceSearchQuery,
  setSelectedDivision,
  setSelectedServiceStatus,
  setServiceViewMode,
  addService,
  updateService,
  deleteService,
  toggleServiceStatus
} = serviceSlice.actions;

export const selectServices = (state) => state.services.items;
export const selectServiceFilters = (state) => ({
  searchQuery: state.services.searchQuery,
  selectedDivision: state.services.selectedDivision,
  selectedStatus: state.services.selectedStatus,
  viewMode: state.services.viewMode
});

export default serviceSlice.reducer;