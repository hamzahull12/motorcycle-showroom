const validateCreateBrand = ({ name }) => {
  const errors = {};

  if (name === undefined) {
    errors.name = 'Name is required';
  } else if (typeof name !== 'string') {
    errors.name = 'Name must be a string';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.trim().length > 100) {
    errors.name = 'Name must not exceed 100 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateUpdateBrand = ({ name }) => {
  const errors = {};

  if (name === undefined) {
    errors.name = 'Name is required';
  } else if (typeof name !== 'string') {
    errors.name = 'Name must be a string';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.trim().length > 100) {
    errors.name = 'Name must not exceed 100 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateCreateBrand,
  validateUpdateBrand,
};