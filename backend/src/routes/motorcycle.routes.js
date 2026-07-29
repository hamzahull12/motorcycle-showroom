import express from 'express';
import motorcycleController from '../controllers/motorcycle.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizeAdmin from '../middlewares/authorize.js';

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, motorcycleController.createMotorcycle);
router.get('/', motorcycleController.getAllMotorcycles);
router.get('/:id', motorcycleController.getMotorcycleById);
router.put('/:id', authenticate, authorizeAdmin, motorcycleController.updateMotorcycle);
router.delete('/:id', authenticate, authorizeAdmin, motorcycleController.deleteMotorcycle);


export default router;