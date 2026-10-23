import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchApi } from "@/lib/api"

export const fetchSettings = createAsyncThunk("settings/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchApi("/settings")
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateSettings = createAsyncThunk(
  "settings/update",
  async (data, { rejectWithValue }) => {
    try {
      const isFormData = data instanceof FormData
      const res = await fetchApi("/settings", {
        method: "PUT",
        body: isFormData ? data : data,
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    data: null,
    loading: false,
    saving: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateSettings.pending, (state) => {
        state.saving = true
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.saving = false
        state.data = action.payload
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.saving = false
        state.error = action.payload
      })
  },
})

export default settingsSlice.reducer