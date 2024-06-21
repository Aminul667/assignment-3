import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { userSignupValidationSchema } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userSignupValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/signin',
  validateRequest(AuthValidation.signInValidationSchema),
  AuthControllers.signIn,
);

export const AuthRoutes = router;
