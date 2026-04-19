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
};