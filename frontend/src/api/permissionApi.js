import axiosInstance from './axiosInstance';

export const permissionApi = {
  // Get all permissions
  getAll: () => {
    return axiosInstance.get('/permissions');
  },

  // Get permission by ID
  getById: id => {
    return axiosInstance.get(`/permissions/${id}`);
  },

  // Get permissions by resource
  getByResource: resource => {
    return axiosInstance.get(`/permissions/resource/${resource}`);
  },

  // Create permission
  create: data => {
    return axiosInstance.post('/permissions', data);
  },

  // Update permission
  update: (id, data) => {
    return axiosInstance.put(`/permissions/${id}`, data);
  },

  // Delete permission
  delete: id => {
    return axiosInstance.delete(`/permissions/${id}`);
  },

  // Get my permissions (based on my role)
  getMyPermissions: () => {
    return axiosInstance.get('/auth/permissions');
  }
};
