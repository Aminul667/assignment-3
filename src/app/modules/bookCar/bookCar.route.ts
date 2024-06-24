import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carBookingValidations } from './bookCar.validation';
import { CarBookingControllers } from './bookCar.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequest(carBookingValidations.carBookingValidationSchema),
  auth('user'),
  CarBookingControllers.createCarBooking,
);

router.get('/', auth(USER_ROLE.admin), CarBookingControllers.getAllBookings);

router.get(
  '/my-bookings',
  auth('user'),
  CarBookingControllers.getAllMyBookings,
);

export const BookingRoutes = router;
