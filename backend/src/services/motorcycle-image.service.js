import { randomUUID } from 'crypto';
import motorcycleImageRepository from '../repositories/motorcycle-image.repository.js';
import motorcycleRepository from '../repositories/motorcycle.repository.js';
import { ConflictError, NotFoundError } from '../utils/errors.js';

const getImagesByMotorcycleId = async (motorcycleId) => {
  const motorcycle =
    await motorcycleRepository.findById(motorcycleId);

  if (!motorcycle) {
    throw new NotFoundError('Motorcycle not found');
  }
  return motorcycleImageRepository.findByMotorcycleId(
    motorcycleId
  );
};

const getImageById = async (id) => {
  const image = await motorcycleImageRepository.findById(id);

  if (!image) {
    throw new NotFoundError('Image not found');
  }

  return image;
}

const createImage = async ({
  motorcycleId,
  imageUrl,
  isPrimary,
  sortOrder,
}) => {
  const motorcycle =
    await motorcycleRepository.findById(motorcycleId);

  if (!motorcycle) {
    throw new NotFoundError('Motorcycle not found');
  }

  const existingImages =
    await motorcycleImageRepository
      .findByMotorcycleId(motorcycleId);

  const shouldBePrimary =
    existingImages.length === 0
      ? true
      : isPrimary;

  if (shouldBePrimary) {
    await motorcycleImageRepository
      .unsetPrimaryImages(motorcycleId);
  }

  const id = randomUUID();

  return motorcycleImageRepository.create({
    id,
    motorcycleId,
    imageUrl,
    isPrimary: shouldBePrimary,
    sortOrder,
  });
}

const updateImage = async (
  id,
  {
    imageUrl,
    isPrimary,
    sortOrder,
  },
) => {
  const image =
    await motorcycleImageRepository
      .findById(id);

  if (!image) {
    throw new NotFoundError(
      'Image not found',
    );
  }

  const fields = {};

  if (imageUrl !== undefined) {
    fields.image_url = imageUrl;
  }

  if (sortOrder !== undefined) {
    fields.sort_order = sortOrder;
  }

  if (isPrimary === true) {
    await motorcycleImageRepository
      .unsetPrimaryImages(
        image.motorcycle_id,
      );

    fields.is_primary = true;
  }

  if (isPrimary === false) {
    const primaryCount =
      await motorcycleImageRepository
        .countPrimaryImages(
          image.motorcycle_id,
        );

    if (primaryCount <= 1 && image.is_primary) {
      throw new ConflictError(
        'Motorcycle must have at least one primary image',
      );
    }

    fields.is_primary = false;
  }

  return motorcycleImageRepository.update(
    id,
    fields,
  );
};

const deleteImage = async (id) => {
  const image =
    await motorcycleImageRepository.findById(id);

  if (!image) {
    throw new NotFoundError(
      'Image not found'
    );
  }


  const motorcycleId =
    image.motorcycle_id;


  if (image.is_primary) {
    const replacement =
      await motorcycleImageRepository
        .findReplacementPrimary(
          motorcycleId,
          id
        );


    if (replacement) {

      await motorcycleImageRepository
        .unsetPrimaryImages(
          motorcycleId
        );

      await motorcycleImageRepository
        .setPrimaryImage(
          replacement.id
        );
    }
  }
  return motorcycleImageRepository.remove(id);
};

export default {
  getImageById,
  getImagesByMotorcycleId,
  createImage,
  updateImage,
  deleteImage
};