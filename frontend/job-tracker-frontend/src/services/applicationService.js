import api from './api';

const applicationService = {
  // Get all applications for current user
  getAll: async () => {
    const response = await api.get('/applications');
    return response.data;
  },

  // Get single application by ID
  getById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  // Create new application
  create: async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },

  // Update application
  update: async (id, applicationData) => {
    const response = await api.put(`/applications/${id}`, applicationData);
    return response.data;
  },

  // Delete application
  delete: async (id) => {
    await api.delete(`/applications/${id}`);
  },
};

export default applicationService;