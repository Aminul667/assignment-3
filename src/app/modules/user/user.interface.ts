import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUserSignup {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
}

export interface UserSignupModel extends Model<TUserSignup> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUserSignup>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
