import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { UserSignupValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { userSignupValidationSchema } from './user.validation';

const router = express.Router();

// router.post(
//   '/signup',
//   validateRequest(userSignupValidationSchema),
//   UserControllers.createUser,
// );

export const UserRoutes = router;
