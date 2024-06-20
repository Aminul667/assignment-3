import mongoose, { model } from 'mongoose';
import { TUserSignup } from './user.interface';

const userSignupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      match: [/.+\@.+\..+/, 'Invalid email address.'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: [true, 'Role is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters long.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      match: [/^\d+$/, 'Phone number must contain only digits.'],
    },
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
  },
  { timestamps: true },
);

export const User = model<TUserSignup>('User', userSignupSchema);
