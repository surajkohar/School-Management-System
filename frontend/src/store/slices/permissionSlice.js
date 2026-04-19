import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';

// Fetch permissions after login
export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getMyPermissions();
      return response.data.data; // permissions array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch permissions');
    }
  }
);

const initialState = {
  permissions: [],        // Array of permission strings like ['student_read', 'grade_write']
  isLoading: false,
  error: null,
};

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    clearPermissions: (state) => {
      state.permissions = [];
      state.error = null;
    },
    // Manual permission check helper
    hasPermission: (state, action) => {
      const { resource, action: permAction } = action.payload;
      return state.permissions.some(p => 
        p.resource === resource && 
        (p.action === permAction || p.action === '*')
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPermissions, hasPermission } = permissionSlice.actions;
export default permissionSlice.reducer;