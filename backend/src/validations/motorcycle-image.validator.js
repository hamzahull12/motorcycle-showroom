const validateCreateImage = ({
  image_url,
  is_primary,
  sort_order,
}) => {
  const errors = {};

  if (image_url === undefined) {
    errors.image_url = 'Image URL is required';
  } else if (typeof image_url !== 'string') {
    errors.image_url = 'Image URL must be a string';
  } else if (image_url.trim().length === 0) {
    errors.image_url = 'Image URL cannot be empty';
  } else {
    try {
      new URL(image_url);
    } catch {
      errors.image_url = 'Image URL must be a valid URL';
    }
  }

  if (
    is_primary !== undefined
    && typeof is_primary !== 'boolean'
  ) {
    errors.is_primary = 'Is primary must be a boolean';
  }

  if (sort_order !== undefined) {
    if (
      !Number.isInteger(sort_order)
      || sort_order < 0
    ) {
      errors.sort_order =
        'Sort order must be a non-negative integer';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateUpdateImage = ({
  image_url,
  is_primary,
  sort_order,
}) => {
  const errors = {};

  if (image_url !== undefined) {
    if (typeof image_url !== 'string') {
      errors.image_url = 'Image URL must be a string';
    } else if (image_url.trim().length === 0) {
      errors.image_url = 'Image URL cannot be empty';
    } else {
      try {
        new URL(image_url);
      } catch {
        errors.image_url =
          'Image URL must be a valid URL';
      }
    }
  }

  if (
    is_primary !== undefined
    && typeof is_primary !== 'boolean'
  ) {
    errors.is_primary =
      'Is primary must be a boolean';
  }

  if (sort_order !== undefined) {
    if (
      !Number.isInteger(sort_order)
      || sort_order < 0
    ) {
      errors.sort_order =
        'Sort order must be a non-negative integer';
    }
  }

  if (Object.keys(errors).length === 0) {
    const hasUpdateField =
      image_url !== undefined
      || is_primary !== undefined
      || sort_order !== undefined;

    if (!hasUpdateField) {
      errors.body = 'At least one field is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateCreateImage,
  validateUpdateImage
};