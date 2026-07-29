import motorcycleService from '../services/motorcycle.service.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
import validation from '../utils/validation.js';
import motorcycleValidator from '../validations/motorcycle.validator.js';

const getAllMotorcycles = async (req, res, next) => {
  const paginationValidation =
    motorcycleValidator.validatePagination(req.query);

  if (!paginationValidation.isValid) {
    return next(new BadRequestError('Validation failed', paginationValidation.errors));
  }

  const filterValidation =
    motorcycleValidator.validateFilters(req.query);

  if (!filterValidation.isValid) {
    return next(new BadRequestError('Validation failed', filterValidation.errors));
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await motorcycleService.getAllMotorcycles({
    page,
    limit,
    brand: req.query.brand,
    category: req.query.category,
    status: req.query.status,
    search: req.query.search,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    minYear: req.query.minYear,
    maxYear: req.query.maxYear,
  });

  const totalPages = Math.ceil(result.total / limit);

  return res.status(200).json({
    status: 'success',
    data: result.data,
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages,
    },
  });
};

const getMotorcycleById = async (req, res, next) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    return next(new BadRequestError('Invalid motorcycle ID format'));
  }

  const motorcycle = await motorcycleService.getMotorcycleById(id);

  if (!motorcycle) {
    return next(new NotFoundError('Motorcycle not found'));
  }

  return res.status(200).json({
    status: 'success',
    data: motorcycle,
  });
};

const createMotorcycle = async (req, res, next) => {
  const validation =
    motorcycleValidator.validateCreateMotorcycle(req.body);

  if (!validation.isValid) {
    return next(new BadRequestError('Validation failed', validation.errors));
  }

  const {
    brand_id,
    title,
    category,
    engine_stroke,
    transmission,
    engine_capacity_cc,
    color,
    year,
    mileage_km,
    price,
    tax_expired_at,
    status,
    location,
    description,
  } = req.body;

  const motorcycle =
    await motorcycleService.createMotorcycle({
      brandId: brand_id,
      title,
      category,
      engineStroke: engine_stroke,
      transmission,
      engineCapacityCc: engine_capacity_cc,
      color,
      year,
      mileageKm: mileage_km,
      price,
      taxExpiredAt: tax_expired_at,
      status,
      location,
      description,
    });

  return res.status(201).json({
    status: 'success',
    data: motorcycle,
  });
};

const updateMotorcycle = async (req, res, next) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    return next(
      new BadRequestError(
        'Invalid motorcycle ID format'
      )
    );
  }

  const validationResult =
    motorcycleValidator.validateUpdateMotorcycle(
      req.body
    );

  if (!validationResult.isValid) {
    return next(
      new BadRequestError(
        'Validation failed',
        validationResult.errors
      )
    );
  }

  const {
    brand_id,
    title,
    category,
    engine_stroke,
    transmission,
    engine_capacity_cc,
    color,
    year,
    mileage_km,
    price,
    tax_expired_at,
    status,
    location,
    description,
  } = req.body;

  const motorcycle =
    await motorcycleService.updateMotorcycle(id, {
      brandId: brand_id,
      title,
      category,
      engineStroke: engine_stroke,
      transmission,
      engineCapacityCc: engine_capacity_cc,
      color,
      year,
      mileageKm: mileage_km,
      price,
      taxExpiredAt: tax_expired_at,
      status,
      location,
      description,
    });

  return res.status(200).json({
    status: 'success',
    data: motorcycle,
  });
};

const deleteMotorcycle = async (req, res, next) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    return next(
      new BadRequestError(
        'Invalid motorcycle ID format'
      )
    );
  }

  await motorcycleService.deleteMotorcycle(id);

  return res.status(204).send();
};

export default {
  getAllMotorcycles,
  getMotorcycleById,
  createMotorcycle,
  updateMotorcycle,
  deleteMotorcycle
};