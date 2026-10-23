import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchApi } from "@/lib/api"

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/stats",
  async (_, { rejectWithValue }) => {
    try {
      const [services, projects, gallery, testimonials, contacts] = await Promise.all([
        fetchApi("/services?limit=1"),
        fetchApi("/projects?limit=1"),
        fetchApi("/gallery?limit=1"),
        fetchApi("/testimonials?limit=1"),
        fetchApi("/contacts?limit=5"),
      ])

      return {
        counts: {
          services: services.data?.pagination?.total || 0,
          projects: projects.data?.pagination?.total || 0,
          gallery: gallery.data?.pagination?.total || 0,
          testimonials: testimonials.data?.pagination?.total || 0,
          contacts: contacts.data?.pagination?.total || 0,
        },
        recentContacts: contacts.data?.contacts || [],
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    counts: { services: 0, projects: 0, gallery: 0, testimonials: 0, contacts: 0 },
    recentContacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.counts = action.payload.counts
        state.recentContacts = action.payload.recentContacts
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default dashboardSlice.reducer