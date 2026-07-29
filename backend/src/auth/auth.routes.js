import express from 'express';

import authController
  from './auth.controller.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post(
  '/login',
  authController.login,
);

router.post(
  '/refresh',
  authController.refresh,
);

router.post(
  '/logout',
  authController.logout,
);

router.get(
  '/me',
  authenticate,
  authController.me,
);


export default router;