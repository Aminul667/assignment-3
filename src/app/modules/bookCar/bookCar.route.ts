import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carBookingValidations } from './bookCar.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(carBookingValidations.carBookingValidationSchema),
  CarControllers.createCar,
);

export const BookingRoutes = router;
