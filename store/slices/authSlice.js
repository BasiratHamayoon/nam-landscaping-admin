import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", credentials)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed")
    }
  }
)

export const logoutAdmin = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout")
      return null
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed")
    }
  }
)

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/me")
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Not authenticated")
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/forgot-password", { email })
      return data.message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send reset link")
    }
  }
)

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { password })
      return data.message || "Password reset successfully"
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to reset password")
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.actionLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(resetPassword.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.actionLoading = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer