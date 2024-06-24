import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization as string;

    // checking if the token is missing
    if (!bearerToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const token = bearerToken.split(' ')[1];

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(userEmail);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const userData = await User.findOne({ email: userEmail });
    const userId = userData?._id;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = { ...(decoded as JwtPayload), userId };
    next();
  });
};

export default auth;
