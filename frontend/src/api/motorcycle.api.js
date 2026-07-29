import api from './axios';

export const getMotorcycles = async ({ page = 1, limit = 10, search = '' }) => {
  const params = {};

  if (page) params.page = Number(page);
  if (limit) params.limit = Number(limit);
  // Hanya kirim search jika nilainya terisi (bukan string kosong)
  if (search && search.trim() !== '') {
    params.search = search.trim();
  }

  const response = await api.get('/motorcycles', { params });
  return response.data;
};

const getMotorcycleById = async (id) => {
  const response = await api.get(`/motorcycles/${id}`);

  return response.data.data;
};

const create = async (payload) => {
  const response = await api.post('/motorcycles', payload);
  return response.data;
};

const update = async (id, payload) => {
  const response = await api.put(`/motorcycles/${id}`, payload);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/motorcycles/${id}`);
  return response.data;
};

export default {
  getMotorcycles,
  getMotorcycleById,
  create,
  update,
  remove
};