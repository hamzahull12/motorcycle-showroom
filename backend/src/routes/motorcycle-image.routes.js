import express from 'express';
import motorcycleImageController from '../controllers/motorcycle-image.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizeAdmin from '../middlewares/authorize.js';

const router = express.Router();

router.get(
  '/motorcycles/:motorcycleId/images',
  motorcycleImageController.getImagesByMotorcycleId
);

router.get(
  '/motorcycle-images/:id',
  motorcycleImageController.getImageById
);

router.post(
  '/motorcycles/:motorcycleId/images',
  authenticate, authorizeAdmin, motorcycleImageController.createImage
);

router.put(
  '/motorcycle-images/:id',
  authenticate, authorizeAdmin, motorcycleImageController.updateImage
);

router.delete(
  '/motorcycle-images/:id',
  authenticate, authorizeAdmin, motorcycleImageController.deleteImage
);

export default router;