import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const carData = req.body;

  const result = await CarServices.createCarIntoDB(carData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car is created successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
};