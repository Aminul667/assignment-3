import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarBookingServices } from './bookCar.service';
import { User } from '../user/user.model';
import { RequestHandler } from 'express';

const createCarBooking = catchAsync(async (req, res) => {
  const carData = req.body;
  const { userId } = req.user;

  const carBookingData = { ...carData, user: userId.toString() };

  const result =
    await CarBookingServices.createCarBookingIntoDB(carBookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

const getAllUserBookings: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await CarBookingServices.getAllUserBookingFromDB(
    userId.toString(),
  );
  console.log('test', userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

export const CarBookingControllers = {
  createCarBooking,
  getAllUserBookings,
};
