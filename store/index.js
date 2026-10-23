import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import dashboardReducer from "./slices/dashboardSlice"
import settingsReducer from "./slices/settingsSlice"
import servicesReducer from "./slices/servicesSlice"
import projectsReducer from "./slices/projectsSlice"
import galleryReducer from "./slices/gallerySlice"
import testimonialsReducer from "./slices/testimonialsSlice"
import contactsReducer from "./slices/contactsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
    services: servicesReducer,
    projects: projectsReducer,
    gallery: galleryReducer,
    testimonials: testimonialsReducer,
    contacts: contactsReducer,
  },
})