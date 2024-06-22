import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarBookingServices } from './bookCar.service';

const createCarBooking = catchAsync(async (req, res) => {
  const carBookingData = req.body;

  const result =
    await CarBookingServices.createCarBookingIntoDB(carBookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

export const CarBookingControllers = {
  createCarBooking,
};
