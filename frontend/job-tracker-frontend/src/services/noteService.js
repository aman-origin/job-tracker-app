import api from './api';

const noteService = {
  // Get all notes for an application
  getAll: async (applicationId) => {
    const response = await api.get(`/applications/${applicationId}/notes`);
    return response.data;
  },

  // Create new note
  create: async (applicationId, content) => {
    const response = await api.post(`/applications/${applicationId}/notes`, {
      content,
    });
    return response.data;
  },
};

export default noteService;