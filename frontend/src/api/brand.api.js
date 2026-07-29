// src/api/brand.api.js
import api from './axios.js';

const getAll = async () => {
  const response = await api.get('/brands');
  return response.data;
};

export default {
  getAll,
};