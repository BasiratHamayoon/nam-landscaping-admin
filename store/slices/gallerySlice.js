import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

export const fetchGallery = createAsyncThunk(
  "gallery/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      if (params?.search) query.append("search", params.search)
      if (params?.category) query.append("category", params.category)
      if (params?.isActive !== undefined) query.append("isActive", params.isActive)
      if (params?.page) query.append("page", params.page)
      if (params?.limit) query.append("limit", params.limit)
      const { data } = await api.get(`/gallery?${query.toString()}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch gallery")
    }
  }
)

export const fetchGalleryById = createAsyncThunk(
  "gallery/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/gallery/${id}`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch gallery item")
    }
  }
)

export const createGallery = createAsyncThunk(
  "gallery/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create gallery item")
    }
  }
)

export const updateGallery = createAsyncThunk(
  "gallery/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/gallery/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update gallery item")
    }
  }
)

export const deleteGallery = createAsyncThunk(
  "gallery/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/gallery/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete gallery item")
    }
  }
)

export const toggleGalleryStatus = createAsyncThunk(
  "gallery/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/gallery/${id}/toggle`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle status")
    }
  }
)

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    items: [],
    currentGallery: null,
    pagination: null,
    loading: false,
    detailLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentGallery: (state) => {
      state.currentGallery = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchGalleryById.pending, (state) => {
        state.detailLoading = true
        state.error = null
      })
      .addCase(fetchGalleryById.fulfilled, (state, action) => {
        state.detailLoading = false
        state.currentGallery = action.payload
      })
      .addCase(fetchGalleryById.rejected, (state, action) => {
        state.detailLoading = false
        state.error = action.payload
      })
      .addCase(createGallery.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(createGallery.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items.unshift(action.payload)
      })
      .addCase(createGallery.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(updateGallery.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(updateGallery.fulfilled, (state, action) => {
        state.actionLoading = false
        const idx = state.items.findIndex((g) => g._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
        if (state.currentGallery?._id === action.payload._id) {
          state.currentGallery = action.payload
        }
      })
      .addCase(updateGallery.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(deleteGallery.pending, (state) => {
        state.actionLoading = true
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items = state.items.filter((g) => g._id !== action.payload)
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(toggleGalleryStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((g) => g._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { clearCurrentGallery, clearError } = gallerySlice.actions
export default gallerySlice.reducer