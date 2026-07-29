import api from './axios.js';

const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);

  return response.data;
};

const refresh = async () => {
  const response = await api.post('/auth/refresh');

  return response.data;
};

const logout = async () => {
  try {
    // Panggil endpoint logout backend jika ada
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error on server:', error);
  } finally {
    // Selalu hapus token dari localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export default {
  login,
  refresh,
  logout
};