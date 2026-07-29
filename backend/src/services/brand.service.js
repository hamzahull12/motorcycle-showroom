import brandRepository from '../repositories/brand.repository.js';

const getAllBrands = async () => {
  const brands = await brandRepository.findAll();

  return brands;
};

const getBrandById = async (id) => {
  const brand = await brandRepository.findById(id);

  return brand;
};

const createBrand = async ({ name }) => {
  const normalizedName = name.trim();

  const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

  const brand = await brandRepository.create({ name: normalizedName, slug });

  return brand;
}

const updatedBrand = async (id, { name }) => {
  const normalizedName = name.trim();

  const slug = normalizedName
    .toLowerCase()
    .replace(/\s+/g, '-');

  const brand = await brandRepository.update(id, {
    name: normalizedName,
    slug,
  });

  return brand;
}

const deleteBrand = async (id) => {
  const brand = await brandRepository.remove(id);

  return brand;
};

export default {
  getAllBrands,
  getBrandById,
  createBrand,
  updatedBrand,
  deleteBrand
};
