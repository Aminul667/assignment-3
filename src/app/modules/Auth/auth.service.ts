import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TSignInUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const signInUser = async (payload: TSignInUser) => {
  // checking if the user is exist
  const userData = await User.isUserExistsByEmail(payload.email);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const { password, ...user } = userData;
  console.log(user);

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, userData?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client
  const jwtPayload = {
    userEmail: userData.email,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  signInUser,
};
