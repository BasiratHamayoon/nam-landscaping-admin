import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'adm-01',
    name: 'Tariq Al-Mansoor',
    email: 'admin@royalplantscape.ae',
    role: 'Managing Director',
    avatar: 'TM',
    lastLogin: 'Today, 09:42 AM',
  },
  isAuthenticated: true,
  rememberMe: true,
  savedEmail: 'admin@royalplantscape.ae',
  loading: false,
  error: null,
  resetEmailSent: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.rememberMe = action.payload.rememberMe;
      state.savedEmail = action.payload.rememberMe ? action.payload.user.email : '';
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    setResetEmailSent: (state, action) => {
      state.resetEmailSent = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  setRememberMe,
  setResetEmailSent,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth?.user;

export default authSlice.reducer;