import motorcycleImageService from '../services/motorcycle-image.service.js';
import { BadRequestError } from '../utils/errors.js';
import validation from '../utils/validation.js';
import motorcycleImageValidator from '../validations/motorcycle-image.validator.js';

const getImagesByMotorcycleId = async (req, res, next) => {

  const { motorcycleId } = req.params;

  if (!validation.isValidUUID(motorcycleId)) {
    return next(
      new BadRequestError(
        'Invalid motorcycle ID format'
      )
    );
  }

  const images =
    await motorcycleImageService
      .getImagesByMotorcycleId(motorcycleId);

  return res.status(200).json({
    status: 'success',
    data: images,
  });
};

const getImageById = async (req, res, next) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    return next(
      new BadRequestError(
        'Invalid image ID format'
      )
    );
  }

  const image = await motorcycleImageService.getImageById(id);

  return res.status(200).json({
    status: 'success',
    data: image
  });
};

const createImage = async (req, res, next) => {
  const { motorcycleId } = req.params;

  if (!validation.isValidUUID(motorcycleId)) {
    return next(
      new BadRequestError(
        'Invalid motorcycle ID format'
      )
    );
  }

  const validationResult =
    motorcycleImageValidator
      .validateCreateImage(req.body);

  if (!validationResult.isValid) {
    return next(
      new BadRequestError('Validation failed')
    );
  }

  const {
    image_url,
    is_primary,
    sort_order,
  } = req.body;

  const image =
    await motorcycleImageService.createImage({
      motorcycleId,
      imageUrl: image_url,
      isPrimary: is_primary,
      sortOrder: sort_order,
    });

  return res.status(201).json({
    status: 'success',
    data: image,
  });
};

const updateImage = async (req, res, next) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    return next(
      new BadRequestError('Invalid image ID format')
    );
  }

  const validationResult =
    motorcycleImageValidator
      .validateUpdateImage(req.body);

  if (!validationResult.isValid) {
    return next(
      new BadRequestError('Validation failed')
    );
  }

  const {
    image_url,
    is_primary,
    sort_order,
  } = req.body;

  const image =
    await motorcycleImageService.updateImage(id, {
      imageUrl: image_url,
      isPrimary: is_primary,
      sortOrder: sort_order,
    });

  return res.status(200).json({
    status: 'success',
    data: image,
  });
};

const deleteImage = async (req, res, next) => {
  const { id } = req.params;

  if (!validation.isValidUUID(id)) {
    return next(
      new BadRequestError('Invalid image ID format')
    );
  }

  await motorcycleImageService.deleteImage(id);

  return res.status(204).send();
};

export default {
  getImagesByMotorcycleId,
  getImageById,
  createImage,
  updateImage,
  deleteImage
}