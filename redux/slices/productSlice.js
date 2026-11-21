import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: 'prod-001',
    name: 'Ficus Microcarpa Bonsai XL',
    sku: 'RP-PLANT-001',
    category: 'plants',
    subCategory: 'indoor-plants',
    price: 1850,
    comparePrice: 2200,
    costPrice: 950,
    stock: 24,
    lowStockThreshold: 5,
    status: 'Active',
    isFeatured: true,
    tags: ['Indoor', 'Luxury', 'Low Maintenance', 'Air Purifying'],
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80&auto=format&fit=crop',
    description: 'Statement indoor bonsai tree with thick sculpted aerial roots and glossy deep green leaves. Perfect for luxury Dubai villas and corporate lobby spaces.',
    metaTitle: 'Luxury Ficus Microcarpa Bonsai XL | Royal Plantscape Dubai',
    metaDescription: 'Buy premium sculpted Ficus Microcarpa Bonsai in Dubai. Hand-picked indoor bonsai trees with white-glove delivery across UAE.',
    salesCount: 142,
    rating: 4.9,
    createdAt: '2024-01-15'
  },
  {
    id: 'prod-002',
    name: 'Royal Canary Date Palm Tree (4 Meter)',
    sku: 'RP-TREE-002',
    category: 'plants',
    subCategory: 'outdoor-plants',
    price: 4500,
    comparePrice: 5000,
    costPrice: 2400,
    stock: 8,
    lowStockThreshold: 3,
    status: 'Active',
    isFeatured: true,
    tags: ['Outdoor', 'Sun Loving', 'Villa Landscape', 'Native Accent'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop',
    description: 'Mature Phoenix Canariensis Date Palm suitable for heat resilience in UAE gardens. Specimen height 4m with robust crown.',
    metaTitle: 'Mature Canary Date Palm Tree 4M | Royal Plantscape Dubai',
    metaDescription: 'Order mature 4-meter Canary Island Date Palms for luxury landscapes in Emirates Hills, Palm Jumeirah & Dubai Hills.',
    salesCount: 38,
    rating: 5.0,
    createdAt: '2024-01-20'
  },
  {
    id: 'prod-003',
    name: 'Handcrafted Italian Terrazzo Cylindrical Planter',
    sku: 'RP-POT-003',
    category: 'pots-planters',
    subCategory: 'luxury-planters',
    price: 780,
    comparePrice: 900,
    costPrice: 320,
    stock: 3,
    lowStockThreshold: 5,
    status: 'Active',
    isFeatured: false,
    tags: ['Terrazzo', 'Handmade', 'Indoor/Outdoor', 'UV Treated'],
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80&auto=format&fit=crop',
    description: 'Ultra-durable Italian terrazzo composite planter with weather-resistant sealant for UAE climate endurance.',
    metaTitle: 'Italian Terrazzo Cylindrical Planter Dubai',
    metaDescription: 'Architectural terrazzo planters handcrafted in Italy for modern homes and commercial spaces in Dubai.',
    salesCount: 89,
    rating: 4.8,
    createdAt: '2024-02-02'
  },
  {
    id: 'prod-004',
    name: 'Smart WiFi 8-Zone Irrigation Controller',
    sku: 'RP-EQUIP-004',
    category: 'equipment',
    subCategory: 'irrigation-gear',
    price: 1250,
    comparePrice: 1400,
    costPrice: 610,
    stock: 45,
    lowStockThreshold: 10,
    status: 'Active',
    isFeatured: true,
    tags: ['Smart Tech', 'Water Saving', 'App Control', 'Weather Sensing'],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80&auto=format&fit=crop',
    description: 'Automatic smart irrigation hub with local weather forecasting sync, reducing water consumption up to 45% during Dubai summer.',
    metaTitle: 'Smart WiFi Water Controller Dubai | Royal Plantscape',
    metaDescription: 'Control villa garden irrigation remotely with real-time weather tracking and app integration.',
    salesCount: 210,
    rating: 4.9,
    createdAt: '2024-02-10'
  },
  {
    id: 'prod-005',
    name: 'Organic Arabian Organic Compost & Topsoil (50L)',
    sku: 'RP-SOIL-005',
    category: 'care-maintenance',
    subCategory: 'soil-fertilizers',
    price: 85,
    comparePrice: 100,
    costPrice: 30,
    stock: 0,
    lowStockThreshold: 15,
    status: 'Out of Stock',
    isFeatured: false,
    tags: ['Organic', 'Soil Enhancement', 'UAE Tested', 'Enrichment'],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop',
    description: 'Thermally treated nutrient-dense organic soil mix designed specifically to enrich sandy desert soils.',
    metaTitle: 'Arabian Organic Compost 50L Dubai',
    metaDescription: 'Premium organic garden topsoil and compost engineered for UAE climate soil enrichment.',
    salesCount: 520,
    rating: 4.7,
    createdAt: '2024-02-14'
  },
  {
    id: 'prod-006',
    name: 'Ultra-Dense Artificial Landscape Turf 45mm (Sqm)',
    sku: 'RP-TURF-006',
    category: 'garden-decor',
    subCategory: 'artificial-turf',
    price: 110,
    comparePrice: 130,
    costPrice: 48,
    stock: 850,
    lowStockThreshold: 100,
    status: 'Active',
    isFeatured: true,
    tags: ['UV Protection', 'Pet Friendly', '45mm Pile', 'Soft Touch'],
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80&auto=format&fit=crop',
    description: 'Luxury 4-color shade synthetic grass with maximum density backing, UV stability guaranteed for 10 years in Gulf weather.',
    metaTitle: 'Luxury 45mm Artificial Grass Turf Dubai',
    metaDescription: 'High-density synthetic lawn grass for villas, rooftop terraces, and children play zones.',
    salesCount: 1140,
    rating: 4.9,
    createdAt: '2024-02-18'
  },
  {
    id: 'prod-007',
    name: 'Polished Black Mexican Beach Pebbles (20kg)',
    sku: 'RP-DECOR-007',
    category: 'garden-decor',
    subCategory: 'pebbles-stones',
    price: 145,
    comparePrice: 170,
    costPrice: 65,
    stock: 120,
    lowStockThreshold: 25,
    status: 'Active',
    isFeatured: false,
    tags: ['Decorative', 'Hardscaping', 'Natural Stone', 'Zen Style'],
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80&auto=format&fit=crop',
    description: 'Naturally smooth rounded basalt stones for zen water features, pathway borders, and decorative planter toppings.',
    metaTitle: 'Black Mexican Beach Pebbles Dubai | Landscape Stones',
    metaDescription: 'High grade polished black river beach stones for luxury landscape aesthetics in UAE.',
    salesCount: 310,
    rating: 4.8,
    createdAt: '2024-02-25'
  },
  {
    id: 'prod-008',
    name: 'Monstera Deliciosa XXL Specimen',
    sku: 'RP-PLANT-008',
    category: 'plants',
    subCategory: 'indoor-plants',
    price: 1200,
    comparePrice: 1450,
    costPrice: 500,
    stock: 2,
    lowStockThreshold: 5,
    status: 'Active',
    isFeatured: true,
    tags: ['Indoor', 'Tropical', 'Statement Plant', 'Low Light'],
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80&auto=format&fit=crop',
    description: 'Extra-large Swiss Cheese Plant standing 1.8m tall with fully mature fenestrated leaves and sturdy wooden support totem.',
    metaTitle: 'XXL Monstera Deliciosa Plant Dubai',
    metaDescription: 'Huge mature Monstera Deliciosa indoor plants delivered with premium pot options in Dubai.',
    salesCount: 76,
    rating: 4.9,
    createdAt: '2024-03-01'
  }
];

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    searchQuery: '',
    selectedCategory: 'all',
    selectedStatus: 'all',
    viewMode: 'grid',
    selectedProduct: null
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    addProduct: (state, action) => {
      const newProd = {
        id: `prod-${Date.now()}`,
        salesCount: 0,
        rating: 5.0,
        createdAt: new Date().toISOString().split('T')[0],
        ...action.payload
      };
      state.items.unshift(newProd);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleProductStatus: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.status = product.status === 'Active' ? 'Draft' : 'Active';
      }
    }
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedStatus,
  setViewMode,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus
} = productSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductFilters = (state) => ({
  searchQuery: state.products.searchQuery,
  selectedCategory: state.products.selectedCategory,
  selectedStatus: state.products.selectedStatus,
  viewMode: state.products.viewMode
});

export default productSlice.reducer;