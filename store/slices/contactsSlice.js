import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      if (params?.search) query.append("search", params.search)
      if (params?.status) query.append("status", params.status)
      if (params?.serviceOfInterest) query.append("serviceOfInterest", params.serviceOfInterest)
      if (params?.page) query.append("page", params.page)
      if (params?.limit) query.append("limit", params.limit)
      
      const { data } = await api.get(`/contacts?${query.toString()}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch contacts")
    }
  }
)

export const fetchContactById = createAsyncThunk(
  "contacts/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/contacts/${id}`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch contact")
    }
  }
)

export const updateContactStatus = createAsyncThunk(
  "contacts/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/contacts/${id}/status`, { status })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update status")
    }
  }
)

export const updateContactNotes = createAsyncThunk(
  "contacts/updateNotes",
  async ({ id, notes }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/contacts/${id}/notes`, { notes })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update notes")
    }
  }
)

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/contacts/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete contact")
    }
  }
)

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    currentContact: null,
    pagination: null,
    loading: false,
    detailLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentContact: (state) => {
      state.currentContact = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchContactById.pending, (state) => {
        state.detailLoading = true
        state.error = null
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.detailLoading = false
        state.currentContact = action.payload
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.detailLoading = false
        state.error = action.payload
      })
      .addCase(updateContactStatus.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.actionLoading = false
        const idx = state.items.findIndex((c) => c._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
        if (state.currentContact?._id === action.payload._id) {
          state.currentContact = action.payload
        }
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(updateContactNotes.pending, (state) => {
        state.actionLoading = true
        state.error = null
      })
      .addCase(updateContactNotes.fulfilled, (state, action) => {
        state.actionLoading = false
        const idx = state.items.findIndex((c) => c._id === action.payload._id)
        if (idx !== -1) state.items[idx] = action.payload
        if (state.currentContact?._id === action.payload._id) {
          state.currentContact = action.payload
        }
      })
      .addCase(updateContactNotes.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
      .addCase(deleteContact.pending, (state) => {
        state.actionLoading = true
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.actionLoading = false
        state.items = state.items.filter((c) => c._id !== action.payload)
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.actionLoading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentContact, clearError } = contactsSlice.actions
export default contactsSlice.reducer