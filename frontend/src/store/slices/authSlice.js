// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import { permissionApi } from '../../api/permissionApi';

// Thunk: Login user
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    const { data } = response.data;

    // Store token
    localStorage.setItem('token', data.token);

    // Fetch permissions (backend returns ALL if super admin)
    const permResponse = await permissionApi.getMyPermissions();
    const permissions = permResponse.data.data;

    return {
      user: data.user,
      token: data.token,
      permissions
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  permissions: [],
  role: null,
  isSuperAdmin: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.permissions = [];
      state.role = null;
      state.isSuperAdmin = false;
      localStorage.removeItem('token');
    },
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.permissions = action.payload.permissions.permissions;
        state.role = action.payload.permissions.role;
        state.isSuperAdmin = action.payload.permissions.isSuperAdmin;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
