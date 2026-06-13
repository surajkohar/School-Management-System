import axiosInstance from './axiosInstance';

export const userApi = {
  // Get user profile
  getProfile: () => {
    return axiosInstance.get('/users/profile');
  },

  // Get all users (admin only)
  getAllUsers: () => {
    return axiosInstance.get('/users/all');
  },

  updateProfile: async formData => {
    // Create a new axios instance without the default Content-Type
    // or override it for this specific request
    return await axiosInstance.post('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Add password change method
  changePassword: async passwordData => {
    return await axiosInstance.post('/users/change-password', passwordData);
  }
};
