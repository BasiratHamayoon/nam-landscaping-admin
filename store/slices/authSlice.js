import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchApi } from "@/lib/api"

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetchApi("/auth/login", { method: "POST", body: credentials })
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchApi("/auth/me")
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const logoutAdmin = createAsyncThunk("auth/logout", async () => {
  await fetchApi("/auth/logout", { method: "POST" })
  return true
})

export const forgotPassword = createAsyncThunk(
  "auth/forgot",
  async (email, { rejectWithValue }) => {
    try {
      const res = await fetchApi("/auth/forgot-password", { method: "POST", body: { email } })
      return res.message
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateAdmin: (state, action) => {
      state.admin = { ...state.admin, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.admin = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.admin = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchMe.rejected, (state) => {
        state.admin = null
        state.isAuthenticated = false
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, updateAdmin } = authSlice.actions
export default authSlice.reducer