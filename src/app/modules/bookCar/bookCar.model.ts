import { Schema, model } from 'mongoose';
import { TBooking } from './bookCar.interface';
import { string } from 'zod';

const carBookingSchema = new Schema<TBooking>({
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  endTime: {
    type: String,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
});

// Create the booking model
export const CarBooking = model<TBooking>('CarBooking', carBookingSchema);
