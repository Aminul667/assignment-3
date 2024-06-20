import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserSignupValidation } from './user.validation';

const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserSignupValidation.userSignupValidationSchema),
  UserControllers.createStudent,
);
