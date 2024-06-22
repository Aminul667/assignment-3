import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidationSchema } from './car.validation';
import { CarControllers } from './car.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(carValidationSchema),
  CarControllers.createCar,
);

router.get('/', CarControllers.getAllCars);

router.get('/:id', CarControllers.getSingleCar);

export const CarRoutes = router;
