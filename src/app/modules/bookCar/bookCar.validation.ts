import { z } from 'zod';

const carBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string(),
    date: z.date({
      required_error: 'Date is required',
    }),
    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
      message: 'Start time must be in 24-hour format (HH:mm)',
    }),
    user: z.string(),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
        message: 'End time must be in 24-hour format (HH:mm)',
      })
      .nullable()
      .optional(),
    totalCost: z.number().default(0),
  }),
});

export const carBookingValidations = {
  carBookingValidationSchema,
};
