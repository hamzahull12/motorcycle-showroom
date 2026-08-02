import brandRepository from '../repositories/brand.repository.js';
import motorcycleRepository from '../repositories/motorcycle.repository.js';
import { ConflictError, NotFoundError } from '../utils/errors.js';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

const getAllMotorcycles = async ({
  page,
  limit,
  brand,
  category,
  status,
  search,
  sortBy,
  sortOrder,
  minPrice,
  maxPrice,
  minYear,
  maxYear,
}) => {
  return motorcycleRepository.findAll({
    page,
    limit,
    brand,
    category,
    status,
    search,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
  });
};

const getMotorcycleById = async (id) => {
  return motorcycleRepository.findById(id);
};

const createMotorcycle = async ({
  brandId,
  title,
  category,
  year,
  price,
  status,
  location,
  description,
}) => {
  const brand = await brandRepository.findById(brandId);

  if (!brand) {
    throw new NotFoundError('Brand not found');
  }

  const id = randomUUID();

  const slug = slugify(title, {
    lower: true,
    strict: true,
  });

  const existingMotorcycle = await motorcycleRepository.findBySlug(slug);

  if (existingMotorcycle) {
    throw new ConflictError('Motorcycle already exists');
  }

  return motorcycleRepository.create({
    id,
    brandId,
    title,
    slug,
    category,
    year,
    price,
    status,
    location,
    description,
  });
};

const updateMotorcycle = async (id, data) => {
  const motorcycle = await motorcycleRepository.findById(id);

  if (!motorcycle) {
    throw new NotFoundError('Motorcycle not found');
  }

  const updateData = {
    id,
    ...data,
  };

  if (data.brandId !== undefined) {
    const brand = await brandRepository.findById(data.brandId);

    if (!brand) {
      throw new NotFoundError('Brand not found');
    }
  }

  if (data.title !== undefined) {
    const slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    const existingMotorcycle = await motorcycleRepository.findBySlug(slug);

    if (existingMotorcycle && existingMotorcycle.id !== id) {
      throw new ConflictError('Motorcycle already exists');
    }

    updateData.slug = slug;
  }

  return motorcycleRepository.update(updateData);
};

const deleteMotorcycle = async (id) => {
  const motorcycle =
    await motorcycleRepository.findById(id);

  if (!motorcycle) {
    throw new NotFoundError('Motorcycle not found');
  }

  return motorcycleRepository.remove(id);
};

export default {
  getAllMotorcycles,
  getMotorcycleById,
  createMotorcycle,
  updateMotorcycle,
  deleteMotorcycle
};