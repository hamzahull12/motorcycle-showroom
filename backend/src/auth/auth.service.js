import bcrypt from 'bcrypt';
import jwt from '../utils/jwt.js';
import { ForbiddenError, UnauthorizedError } from '../utils/errors.js';
import authRepository from './auth.repository.js';

const login = async ({
  email,
  password,
}) => {
  const user =
    await authRepository.findByEmail(email);

  if (!user) {
    throw new UnauthorizedError(
      'Invalid email or password'
    );
  }

  if (!user.is_active) {
    throw new ForbiddenError(
      'User is inactive'
    );
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password_hash,
    );

  if (!isPasswordValid) {
    throw new UnauthorizedError(
      'Invalid email or password'
    );
  }

  const payload = {
    id: user.id,
    role: user.role,
  };

  const accessToken =
    jwt.generateAccessToken(payload);

  const refreshToken =
    jwt.generateRefreshToken(payload);

  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  );

  await authRepository.createRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

  await authRepository.updateLastLogin(
    user.id,
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refresh = async ({
  refreshToken,
}) => {
  const storedToken =
    await authRepository.findRefreshToken(
      refreshToken,
    );

  if (!storedToken) {
    throw new UnauthorizedError(
      'Invalid refresh token',
    );
  }

  let payload;

  try {
    payload =
      jwt.verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new UnauthorizedError(
      'Invalid refresh token',
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

  const accessToken =
    jwt.generateAccessToken({
      id: user.id,
      role: user.role,
    });

  return {
    accessToken,
  };
};

const logout = async ({
  refreshToken,
}) => {
  const storedToken =
    await authRepository.findRefreshToken(
      refreshToken,
    );

  if (!storedToken) {
    throw new UnauthorizedError(
      'Invalid refresh token',
    );
  }

  await authRepository.deleteRefreshToken(
    refreshToken,
  );
};

export default {
  login,
  refresh,
  logout
}