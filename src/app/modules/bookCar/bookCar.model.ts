import { Schema, model } from 'mongoose';
import { TBooking } from './bookCar.interface';
import { string } from 'zod';

const carBookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    default: null,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
});

export const CarBooking = model<TBooking>('CarBooking', carBookingSchema);
