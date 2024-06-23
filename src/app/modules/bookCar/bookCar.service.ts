import { TBooking } from './bookCar.interface';
import { CarBooking } from './bookCar.model';

const createCarBookingIntoDB = async (payload: TBooking) => {
  const result = await CarBooking.create(payload);

  // console.log(result._id);
  console.log('payload', payload);

  // Populate the result
  const populatedResult = await CarBooking.findById(result._id)
    .populate({
      path: 'user',
      model: 'User',
      select: '-password -createdAt -updatedAt -__v',
    })
    .populate('carId')
    .exec();
  return populatedResult;
};

export const CarBookingServices = {
  createCarBookingIntoDB,
};
