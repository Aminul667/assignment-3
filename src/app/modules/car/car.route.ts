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

export const CarRoutes = router;
