import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      if (params?.category) query.append("category", params.category)
      if (params?.search) query.append("search", params.search)
      if (params?.isActive !== undefined) query.append("isActive", params.isActive)
      if (params?.isFeatured !== undefined) query.append("isFeatured", params.isFeatured)
      if (params?.page) query.append("page", params.page)
      if (params?.limit) query.append("limit", params.limit)
      const { data } = await api.get(`/services?${query.toString()}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch services")
    }
  }
)

export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/services/${id}`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch service")
    }
  }
)

export const createService = createAsyncThunk(
  "services/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create service")
    }
  }
)

export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update service")
    }
  }
)

export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/services/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete service")
    }
  }
)

export const toggleServiceStatus = createAsyncThunk(
  "services/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/services/${id}/toggle`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle status")
    }
  }
)

export const deleteGalleryImage = createAsyncThunk(
  "services/deleteGalleryImage",
  async ({ serviceId, publicId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/services/${serviceId}/gallery`, {
        data: { publicId },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete image")
    }
  }
)

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    items: [],
    currentService: null,
    pagination: null,
    loading: false,
    detailLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentService: (state) => {
      state.currentService = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.detailLoading = true
        state.error = null
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.detailLoading = false
        state.currentService = action.payload
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.detailLoading = false
        state.error = action.payload
      })
      .addCase(createService.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items.unshift(action.payload)
      })
      .addCase(createService.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(updateService.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.actionLoading = false
        const idx = state.items.findIndex((s) => s._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
        if (state.currentService?._id === action.payload._id) {
          state.currentService = action.payload
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(deleteService.pending, (state) => {
        state.actionLoading = true
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items = state.items.filter((s) => s._id !== action.payload)
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(toggleServiceStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((s) => s._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(deleteGalleryImage.fulfilled, (state, action) => {
        state.currentService = action.payload
        const idx = state.items.findIndex((s) => s._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { clearCurrentService, clearError } = servicesSlice.actions
export default servicesSlice.reducer