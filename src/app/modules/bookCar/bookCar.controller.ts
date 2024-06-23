import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarBookingServices } from './bookCar.service';
import { User } from '../user/user.model';

const createCarBooking = catchAsync(async (req, res) => {
  const carData = req.body;
  const { userId } = req.user;

  const carBookingData = { ...carData, user: userId.toString() };

  console.log('test', carBookingData);

  // const userData = await User.findOne({ email: userEmail });
  // console.log(userData);
  // const carBookingData = { ...data, user: userEmail };

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
