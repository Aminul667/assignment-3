import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';
import { RequestHandler } from 'express';

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

const getAllCars: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

const getSingleCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  });
});

const updateCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const car = req.body;

  const result = await CarServices.updateCarIntoDB(id, car);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
