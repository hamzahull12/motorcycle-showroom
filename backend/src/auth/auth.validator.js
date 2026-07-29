const validateLogin = ({
  email,
  password,
}) => {
  const errors = {};

  if (email === undefined) {
    errors.email = 'Email is required';
  } else if (typeof email !== 'string') {
    errors.email = 'Email must be a string';
  } else if (email.trim() === '') {
    errors.email = 'Email is required';
  }

  if (password === undefined) {
    errors.password = 'Password is required';
  } else if (typeof password !== 'string') {
    errors.password = 'Password must be a string';
  } else if (password.trim() === '') {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateRefreshToken = ({
  refreshToken,
}) => {
  const errors = {};

  if (refreshToken === undefined) {
    errors.refreshToken =
      'Refresh token is required';
  } else if (
    typeof refreshToken !== 'string'
  ) {
    errors.refreshToken =
      'Refresh token must be a string';
  } else if (
    refreshToken.trim() === ''
  ) {
    errors.refreshToken =
      'Refresh token is required';
  }

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateLogin,
  validateRefreshToken
};