import authRepository from '../auth/auth.repository.js';
import { ForbiddenError, UnauthorizedError } from '../utils/errors.js';
import jwt from '../utils/jwt.js';

const authenticate = async (
  req,
  res,
  next,
) => {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError(
        'Access token is required',
      );
    }

    const [
      scheme,
      token,
    ] = authorization.split(' ');

    if (
      scheme !== 'Bearer' ||
      !token
    ) {
      throw new UnauthorizedError(
        'Invalid authorization header',
      );
    }

    let payload;

    try {
      payload =
        jwt.verifyAccessToken(token);
    } catch (error) {
      throw new UnauthorizedError(
        'Invalid access token',
      );
    }

    const user =
      await authRepository.findById(
        payload.id,
      );

    if (!user) {
      throw new UnauthorizedError(
        'User not found',
      );
    }

    if (!user.is_active) {
      throw new ForbiddenError(
        'User is inactive',
      );
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;