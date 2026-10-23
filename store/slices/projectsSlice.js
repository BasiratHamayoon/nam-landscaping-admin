import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      if (params?.search) query.append("search", params.search)
      if (params?.serviceType) query.append("serviceType", params.serviceType)
      if (params?.isActive !== undefined) query.append("isActive", params.isActive)
      if (params?.isFeatured !== undefined) query.append("isFeatured", params.isFeatured)
      if (params?.page) query.append("page", params.page)
      if (params?.limit) query.append("limit", params.limit)
      const { data } = await api.get(`/projects?${query.toString()}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch projects")
    }
  }
)

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/projects/${id}`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch project")
    }
  }
)

export const createProject = createAsyncThunk(
  "projects/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create project")
    }
  }
)

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update project")
    }
  }
)

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete project")
    }
  }
)

export const toggleProjectStatus = createAsyncThunk(
  "projects/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/projects/${id}/toggle`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle status")
    }
  }
)

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    currentProject: null,
    pagination: null,
    loading: false,
    detailLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.detailLoading = true
        state.error = null
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.detailLoading = false
        state.currentProject = action.payload
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.detailLoading = false
        state.error = action.payload
      })
      .addCase(createProject.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items.unshift(action.payload)
      })
      .addCase(createProject.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(updateProject.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.actionLoading = false
        const idx = state.items.findIndex((p) => p._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
        if (state.currentProject?._id === action.payload._id) {
          state.currentProject = action.payload
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(deleteProject.pending, (state) => {
        state.actionLoading = true
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items = state.items.filter((p) => p._id !== action.payload)
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(toggleProjectStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
      })
  },
})

export const { clearCurrentProject, clearError } = projectsSlice.actions
export default projectsSlice.reducer