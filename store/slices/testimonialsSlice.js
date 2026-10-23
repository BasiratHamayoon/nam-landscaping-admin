import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      if (params?.search) query.append("search", params.search)
      if (params?.rating) query.append("rating", params.rating)
      if (params?.isActive !== undefined) query.append("isActive", params.isActive)
      if (params?.page) query.append("page", params.page)
      if (params?.limit) query.append("limit", params.limit)
      
      const { data } = await api.get(`/testimonials?${query.toString()}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch testimonials")
    }
  }
)

export const fetchTestimonialById = createAsyncThunk(
  "testimonials/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/testimonials/${id}`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch testimonial")
    }
  }
)

export const createTestimonial = createAsyncThunk(
  "testimonials/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/testimonials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create testimonial")
    }
  }
)

export const updateTestimonial = createAsyncThunk(
  "testimonials/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/testimonials/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update testimonial")
    }
  }
)

export const deleteTestimonial = createAsyncThunk(
  "testimonials/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/testimonials/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete testimonial")
    }
  }
)

export const toggleTestimonialStatus = createAsyncThunk(
  "testimonials/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/testimonials/${id}/toggle`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle status")
    }
  }
)

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    items: [],
    currentTestimonial: null,
    pagination: null,
    loading: false,
    detailLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentTestimonial: (state) => {
      state.currentTestimonial = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchTestimonialById.pending, (state) => {
        state.detailLoading = true
        state.error = null
      })
      .addCase(fetchTestimonialById.fulfilled, (state, action) => {
        state.detailLoading = false
        state.currentTestimonial = action.payload
      })
      .addCase(fetchTestimonialById.rejected, (state, action) => {
        state.detailLoading = false
        state.error = action.payload
      })
      .addCase(createTestimonial.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items.unshift(action.payload)
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(updateTestimonial.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false
        const idx = state.items.findIndex((t) => t._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
        if (state.currentTestimonial?._id === action.payload._id) {
          state.currentTestimonial = action.payload
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(deleteTestimonial.pending, (state) => {
        state.actionLoading = true
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items = state.items.filter((t) => t._id !== action.payload)
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(toggleTestimonialStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { clearCurrentTestimonial, clearError } = testimonialsSlice.actions
export default testimonialsSlice.reducer