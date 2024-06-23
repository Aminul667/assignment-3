import { z } from 'zod';

const carBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string(),
    date: z.string({
      required_error: 'Date is required',
    }),
    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
      message: 'Start time must be in 24-hour format (HH:mm)',
    }),
    user: z.string().optional(),
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

// const updateCarBookingValidationSchema = z.object({
//   body: z
//     .object({
//       carId: z.string(),
//       date: z.string({
//         required_error: 'Date is required',
//       }),
//       startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
//         message: 'Start time must be in 24-hour format (HH:mm)',
//       }),
//       user: z.string().optional(),
//       endTime: z
//         .string()
//         .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
//           message: 'End time must be in 24-hour format (HH:mm)',
//         })
//         .nullable()
//         .optional(),
//       totalCost: z.number().default(0),
//     })
//     .partial(),
// });

const carReturnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
      message: 'End time must be in 24-hour format (HH:mm)',
    }),
  }),
});

export const carBookingValidations = {
  carBookingValidationSchema,
  carReturnValidationSchema,
};
