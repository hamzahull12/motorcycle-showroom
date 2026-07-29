import {
  BadRequestError,
  UnauthorizedError,
} from '../utils/errors.js';

import authService from './auth.service.js';
import authValidator from './auth.validator.js';

const login = async (req, res, next) => {
  const validation =
    authValidator.validateLogin(req.body);

  if (!validation.isValid) {
    return next(
      new BadRequestError(
        'Validation failed',
        validation.errors,
      ),
    );
  }

  const {
    email,
    password,
  } = req.body;

  const tokens =
    await authService.login({
      email,
      password,
    });

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  return res.status(200).json({
    status: 'success',
    data: {
      accessToken: tokens.accessToken,
    },
  });
};

const me = async (req, res) => {
  return res.json({
    status: 'success',
    data: req.user,
  });
};

const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(
      new UnauthorizedError(
        'Refresh token not found',
      ),
    );
  }

  const token =
    await authService.refresh({
      refreshToken,
    });

  return res.status(200).json({
    status: 'success',
    data: token,
  });
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(204).send();
  }

  await authService.logout({
    refreshToken,
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  return res.status(204).send();
};

export default {
  login,
  me,
  refresh,
  logout,
};