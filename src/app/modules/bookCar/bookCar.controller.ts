import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarBookingServices } from './bookCar.service';
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

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarBookingServices.getAllBookingsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getAllMyBookings: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await CarBookingServices.getAllMyBookingsFromDB(
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

const updateReturnCarTime: RequestHandler = catchAsync(async (req, res) => {
  const car = req.body;

  const result = await CarBookingServices.updateReturnCarTimeIntoDB(car);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: result,
  });
});

export const CarBookingControllers = {
  createCarBooking,
  getAllMyBookings,
  updateReturnCarTime,
  getAllBookings,
};
