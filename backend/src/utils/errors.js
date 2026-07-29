export class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message, errors = null) {
    super(message, 400, errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message) {
    super(message, 403);
  }
}