import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  carValidationSchema,
  updateCarValidationSchema,
} from './car.validation';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';
import { carBookingValidations } from '../bookCar/bookCar.validation';
import { CarBookingControllers } from '../bookCar/bookCar.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(carValidationSchema),
  CarControllers.createCar,
);

router.get('/', CarControllers.getAllCars);

router.get('/:id', CarControllers.getSingleCar);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  CarControllers.updateCar,
);

router.delete('/:id', CarControllers.deleteCar);

router.post(
  '/return',
  auth(USER_ROLE.admin),
  validateRequest(carBookingValidations.carReturnValidationSchema),
  CarBookingControllers.updateReturnCarTime,
);

export const CarRoutes = router;
