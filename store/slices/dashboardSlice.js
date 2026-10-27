import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchApi } from "@/lib/api"

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/stats",
  async (_, { rejectWithValue, getState }) => {
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
        fetchedAt: Date.now(),
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
  {
    // Prevent duplicate concurrent calls + cache for 60 seconds
    condition: (_, { getState }) => {
      const { dashboard } = getState()
      if (dashboard.loading) return false
      if (dashboard.fetchedAt && Date.now() - dashboard.fetchedAt < 60_000) return false
      return true
    },
  }
)

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    counts: { services: 0, projects: 0, gallery: 0, testimonials: 0, contacts: 0 },
    recentContacts: [],
    loading: false,
    error: null,
    fetchedAt: null,
  },
  reducers: {
    invalidateDashboard: (state) => {
      state.fetchedAt = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.counts = action.payload.counts
        state.recentContacts = action.payload.recentContacts
        state.fetchedAt = action.payload.fetchedAt
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { invalidateDashboard } = dashboardSlice.actions
export default dashboardSlice.reducer