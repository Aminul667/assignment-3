import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carBookingValidations } from './bookCar.validation';
import { CarBookingControllers } from './bookCar.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(carBookingValidations.carBookingValidationSchema),
  auth('user'),
  CarBookingControllers.createCarBooking,
);

router.get(
  '/my-bookings',
  auth('user'),
  CarBookingControllers.getAllUserBookings,
);

export const BookingRoutes = router;
