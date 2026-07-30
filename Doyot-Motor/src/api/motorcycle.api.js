import api from './axios';

const getMotorcycles = async ({
  page = 1,
  limit = 10,
  search = '',
  brand = '',
  category = '',
  status = '',
  sortBy = '',
  sortOrder = '',
  minPrice = '',
  maxPrice = '',
  minYear = '',
  maxYear = '',
} = {}) => {
  const params = {};

  // Pagination
  if (page) {
    params.page = Number(page);
  }

  if (limit) {
    params.limit = Number(limit);
  }

  // Search
  if (search && search.trim() !== '') {
    params.search = search.trim();
  }

  // Brand
  if (brand && brand.trim() !== '') {
    params.brand = brand.trim();
  }

  // Category
  if (category && category.trim() !== '') {
    params.category = category.trim();
  }

  // Status
  if (status && status.trim() !== '') {
    params.status = status.trim();
  }

  // Sorting
  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (sortOrder) {
    params.sortOrder = sortOrder;
  }

  // Price
  if (minPrice !== '' && minPrice !== undefined) {
    params.minPrice = Number(minPrice);
  }

  if (maxPrice !== '' && maxPrice !== undefined) {
    params.maxPrice = Number(maxPrice);
  }

  // Year
  if (minYear !== '' && minYear !== undefined) {
    params.minYear = Number(minYear);
  }

  if (maxYear !== '' && maxYear !== undefined) {
    params.maxYear = Number(maxYear);
  }

  const response = await api.get('/motorcycles', {
    params,
  });

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
  remove,
};