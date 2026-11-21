import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  setResetEmailSent,
} from '../slices/authSlice';

export const loginAdmin = ({ email, password, rememberMe }) => async (dispatch) => {
  dispatch(loginStart());
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (!email || !password) {
    dispatch(loginFailure('Please enter both email and password.'));
    return false;
  }

  const userPayload = {
    id: 'adm-01',
    name: 'Tariq Al-Mansoor',
    email,
    role: 'Managing Director',
    avatar: email.substring(0, 2).toUpperCase(),
    lastLogin: 'Just now',
  };

  if (typeof window !== 'undefined') {
    if (rememberMe) {
      localStorage.setItem('royal_admin_remember_email', email);
    } else {
      localStorage.removeItem('royal_admin_remember_email');
    }
  }

  dispatch(loginSuccess({ user: userPayload, rememberMe }));
  return true;
};

export const logoutAdmin = () => (dispatch) => {
  dispatch(logoutUser());
};

export const sendResetLink = (email) => async (dispatch) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  dispatch(setResetEmailSent(true));
  return true;
};