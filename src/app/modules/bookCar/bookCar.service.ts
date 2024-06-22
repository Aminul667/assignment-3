import { Car } from '../car/car.model';
import { TBooking } from './bookCar.interface';

const createCarBookingIntoDB = async (payload: TBooking) => {
  const result = await Car.create(payload);
  return result;
};

export const CarBookingServices = {
  createCarBookingIntoDB,
};
