import { AppError } from '../utils/errors.js';

const errorMiddleware = (error, req, res, next) => {
  console.error(error);

  if (error instanceof AppError) {
    const response = {
      status: 'error',
      message: error.message,
    };

    if (error.errors) {
      response.errors = error.errors;
    }

    return res.status(error.statusCode).json(response);
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default errorMiddleware;