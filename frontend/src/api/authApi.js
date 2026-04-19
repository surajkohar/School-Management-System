import axiosInstance from '.././api/axiosInstance';

export const authApi = {
  // Login
  login: credentials => {
    return axiosInstance.post('/auth/login', credentials);
  },

  // Register
  register: userData => {
    return axiosInstance.post('/auth/register', userData);
  },

  // Get current user (token auto-attached by interceptor)
  getMe: () => {
    return axiosInstance.get('/auth/me');
  },

  getMyPermissions: () => {
    return axiosInstance.get('/auth/permissions');
  }
};
