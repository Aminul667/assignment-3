import { Model } from 'mongoose';

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
  // isJWTIssuedBeforePasswordChanged(
  //   passwordChangedTimestamp: Date,
  //   jwtIssuedTimestamp: number,
  // ): boolean;
}
