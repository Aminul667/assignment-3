import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  carValidationSchema,
  updateCarValidationSchema,
} from './car.validation';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(carValidationSchema),
  CarControllers.createCar,
);

router.get('/', auth('user'), CarControllers.getAllCars);

router.get('/:id', CarControllers.getSingleCar);

router.patch(
  '/:id',
  validateRequest(updateCarValidationSchema),
  CarControllers.updateCar,
);

router.delete('/:id', CarControllers.deleteCar);

export const CarRoutes = router;
