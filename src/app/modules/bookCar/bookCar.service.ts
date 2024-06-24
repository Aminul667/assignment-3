import QueryBuilder from '../../builder/QueryBuilder';
import { Car } from '../car/car.model';
import { TBooking, TCarReturn } from './bookCar.interface';
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

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingSearchableFields = ['carId', 'date'];

  const bookingQuery = new QueryBuilder(
    CarBooking.find()
      .populate({
        path: 'user',
        model: 'User',
        select: '-password -createdAt -updatedAt -__v',
      })
      .populate({
        path: 'carId',
        model: 'Car',
        select: '-__v',
      }),
    query,
  ).filter();

  const result = await bookingQuery.modelQuery;
  return result;
};

const getAllMyBookingsFromDB = async (userId: string) => {
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

const updateReturnCarTimeIntoDB = async (payload: Partial<TCarReturn>) => {
  const { bookingId, endTime } = payload;

  const booking = await CarBooking.findById(bookingId)
    .populate({
      path: 'carId',
      model: 'Car',
      select: 'pricePerHour',
    })
    .exec();

  if (!booking) {
    throw new Error('Booking id is not found');
  }

  const { startTime, carId, date } = booking;
  const carData = await Car.findById(carId);

  if (!carData) {
    throw new Error('Car is not found');
  }

  const pricePerHour = carData?.pricePerHour;

  console.log(pricePerHour);

  // Calculate duration in hours
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);
  const durationInHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

  // Calculate total cost
  const totalCost = durationInHours * pricePerHour;

  const result = await CarBooking.findByIdAndUpdate(
    bookingId,
    { $set: { endTime: endTime, totalCost: totalCost } },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new Error('Booking id is not fond');
  }

  // Populate the result
  const populatedResult = await CarBooking.findById(bookingId)
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

export const CarBookingServices = {
  createCarBookingIntoDB,
  getAllMyBookingsFromDB,
  updateReturnCarTimeIntoDB,
  getAllBookingsFromDB,
};
