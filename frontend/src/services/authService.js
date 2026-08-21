import API from './api';

export const authService = {
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (fullName, email, password) => {
    const response = await API.post('/auth/register', { fullName, email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  }
};
