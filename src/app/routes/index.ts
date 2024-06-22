import { Router } from 'express';
// import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CarRoutes } from '../modules/car/car.route';
import { BookingRoutes } from '../modules/bookCar/bookCar.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
