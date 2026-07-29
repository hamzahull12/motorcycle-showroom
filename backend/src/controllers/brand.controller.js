import brandService from '../services/brand.service.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
import validation from '../utils/validation.js';
import brandValidator from '../validations/brand.validator.js';

const getAllBrands = async (req, res) => {
  const brands = await brandService.getAllBrands();

  return res.status(200).json({
    status: 'success',
    data: brands,
  });
};

const getBrandById = async (req, res) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    throw new BadRequestError('Invalid brand ID format');
  }

  const brand = await brandService.getBrandById(id);

  if (!brand) {
    throw new NotFoundError('Brand not found');
  }

  return res.status(200).json({
    status: 'success',
    data: brand,
  });
};

const createBrand = async (req, res) => {
  const validation = brandValidator.validateCreateBrand(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: validation.errors,
    });
  }

  const brand = await brandService.createBrand(req.body);

  return res.status(201).json({
    status: 'success',
    data: brand,
  });
};

const updateBrand = async (req, res) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    throw new BadRequestError('Invalid brand ID format');
  }

  const validationResult = brandValidator.validateUpdateBrand(req.body);

  if (!validationResult.isValid) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: validationResult.errors,
    });
  }

  const brand = await brandService.updatedBrand(id, req.body);

  if (!brand) {
    throw new NotFoundError('Brand not found');
  }

  return res.status(200).json({
    status: 'success',
    data: brand,
  });
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    throw new BadRequestError('Invalid brand ID format');
  }

  const brand = await brandService.deleteBrand(id);

  if (!brand) {
    throw new NotFoundError('Brand not found');
  }

  return res.status(204).send();
};

export default {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};
