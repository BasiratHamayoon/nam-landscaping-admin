import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import productReducer from './slices/productSlice';
import serviceReducer from './slices/serviceSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    products: productReducer,
    services: serviceReducer,
    orders: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;