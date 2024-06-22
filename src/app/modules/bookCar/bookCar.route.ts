import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carBookingValidations } from './bookCar.validation';
import { CarBookingControllers } from './bookCar.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(carBookingValidations.carBookingValidationSchema),
  CarBookingControllers.createCarBooking,
);

export const BookingRoutes = router;
