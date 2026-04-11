import api from './api';
import { auth } from '../utils/auth';

const authService = {
  // Register new user
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    
    const { token, name: userName, email: userEmail } = response.data;
    auth.setAuth(token, { name: userName, email: userEmail });
    
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    
    const { token, name, email: userEmail } = response.data;
    auth.setAuth(token, { name, email: userEmail });
    
    return response.data;
  },

  // Logout user
  logout: () => {
    auth.clearAuth();
  },
};

export default authService;