import { TBooking } from './bookCar.interface';
import { CarBooking } from './bookCar.model';

const createCarBookingIntoDB = async (payload: TBooking) => {
  const result = await CarBooking.create(payload);

  // Populate the result
  const populatedResult = await CarBooking.findById(result._id)
    .populate({
      path: 'user',
      model: 'User',
      select: '-password -createdAt -updatedAt -__v',
    })
    .populate({
      path: 'carId',
      model: 'Car',
      select: '-__v',
    })
    .exec();
  return populatedResult;
};

const getAllUserBookingFromDB = async (userId: string) => {
  console.log(userId);
  const result = await CarBooking.find({ user: userId })
    .populate({
      path: 'user',
      model: 'User',
      select: '-password -createdAt -updatedAt -__v',
    })
    .populate({
      path: 'carId',
      model: 'Car',
      select: '-__v',
    });
  return result;
};

export const CarBookingServices = {
  createCarBookingIntoDB,
  getAllUserBookingFromDB,
};
