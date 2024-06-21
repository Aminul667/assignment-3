import mongoose, { model } from 'mongoose';
import { TUserSignup, UserSignupModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

userSignupSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
userSignupSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSignupSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSignupSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUserSignup, UserSignupModel>(
  'User',
  userSignupSchema,
);
