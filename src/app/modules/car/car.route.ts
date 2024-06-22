import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  carValidationSchema,
  updateCarValidationSchema,
} from './car.validation';
import { CarControllers } from './car.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(carValidationSchema),
  CarControllers.createCar,
);

router.get('/', CarControllers.getAllCars);

router.get('/:id', CarControllers.getSingleCar);

router.patch(
  '/:id',
  validateRequest(updateCarValidationSchema),
  CarControllers.updateCar,
);

export const CarRoutes = router;
