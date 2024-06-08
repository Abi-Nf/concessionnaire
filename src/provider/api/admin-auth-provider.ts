import { AdminData } from 'provider/api/admin';
import { AuthProvider } from 'react-admin';
import { apiClient } from '../client';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const res = await apiClient.post('/auth/login', {
      email: username,
      password,
    });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    const res = await apiClient.get<AdminData>('/auth/whoami', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (token && res.data.id) {
      return Promise.resolve();
    }
    localStorage.removeItem('token');
    return Promise.reject();
  },
  checkError: (error) => {
    if (error.status === 401) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: async () => {
    const res = await apiClient.get<AdminData>('/auth/whoami', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return {
      id: res.data.id,
      fullName: res.data.lastName,
    };
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};
