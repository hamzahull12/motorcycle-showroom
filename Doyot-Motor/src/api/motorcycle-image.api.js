// src/api/motorcycle-image.api.js
import api from './axios'; // Menggunakan instance axios yang sudah include credentials/cookies

export const getImagesByMotorcycleId = async (motorcycleId) => {
  const response = await api.get(`/motorcycles/${motorcycleId}/images`);
  return response.data; // Mengembalikan { status: 'success', data: [...] }
};

export const createImage = async (motorcycleId, { imageUrl, isPrimary = false, sortOrder = 0 }) => {
  const response = await api.post(`/motorcycles/${motorcycleId}/images`, {
    image_url: imageUrl,
    is_primary: isPrimary,
    sort_order: sortOrder
  });
  return response.data;
};

export const updateImage = async (imageId, { imageUrl, isPrimary, sortOrder }) => {
  const payload = {};
  if (imageUrl !== undefined) payload.image_url = imageUrl;
  if (isPrimary !== undefined) payload.is_primary = isPrimary;
  if (sortOrder !== undefined) payload.sort_order = sortOrder;

  const response = await api.put(`/motorcycle-images/${imageId}`, payload);
  return response.data;
};

export const deleteImage = async (imageId) => {
  await api.delete(`/motorcycle-images/${imageId}`);
};

export default {
  getImagesByMotorcycleId,
  createImage,
  updateImage,
  deleteImage,
};