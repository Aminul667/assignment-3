import { Types } from 'mongoose';
import { TUserSignup } from '../user/user.interface';
import { TCar } from '../car/car.interface';

export interface TBooking extends Document {
  date: string;
  startTime: string;
  endTime: string | null;
  user: Types.ObjectId | TUserSignup;
  carId: Types.ObjectId | TCar;
  totalCost: number;
}

export interface TCarReturn {
  bookingId: Types.ObjectId;
  endTime: string;
}
