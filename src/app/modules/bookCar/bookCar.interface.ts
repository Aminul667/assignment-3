import { Types } from 'mongoose';

export interface TBooking {
  carId: Types.ObjectId;
  date: Date;
  startTime: string;
  user: Types.ObjectId;
  endTime: string | null;
  totalCost: number;
}
