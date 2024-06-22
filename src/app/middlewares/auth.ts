import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction,
    ) => {
      const bearerToken = req.headers.authorization as string;
      const token = bearerToken.split(' ')[1];

      // checking if the token is missing
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userEmail, iat } = decoded;

      console.log(decoded);

      // checking if the user is exist
      const user = await User.isUserExistsByEmail(userEmail);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }
      // checking if the user is already deleted

      // const isDeleted = user?.isDeleted;

      // if (isDeleted) {
      //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
      // }

      // checking if the user is blocked
      // const userStatus = user?.status;

      // if (userStatus === 'blocked') {
      //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
      // }

      // if (
      //   user.passwordChangedAt &&
      //   User.isJWTIssuedBeforePasswordChanged(
      //     user.passwordChangedAt,
      //     iat as number,
      //   )
      // ) {
      //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      // }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;
