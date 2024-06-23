import { Types } from 'mongoose';

export interface TBooking {
  date: string;
  startTime: string;
  endTime: string | null;
  user: Types.ObjectId;
  carId: Types.ObjectId;
  totalCost: number;
}
