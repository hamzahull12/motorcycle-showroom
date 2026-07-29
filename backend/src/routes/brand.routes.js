import express from 'express';
import brandController from '../controllers/brand.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizeAdmin from '../middlewares/authorize.js';

const router = express.Router();

router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.post('/', authenticate, authorizeAdmin, brandController.createBrand);
router.put('/:id', authenticate, authorizeAdmin, brandController.updateBrand);
router.delete('/:id', authenticate, authorizeAdmin, brandController.deleteBrand);

export default router;