import { z } from 'zod';

export const carValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    features: z.array(z.string()),
    pricePerHour: z.number(),
  }),
});

// export const updateCarValidationSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     description: z.string().optional(),
//     color: z.string().optional(),
//     isElectric: z.boolean().optional(),
//     features: z.array(z.string()).optional(),
//     pricePerHour: z.number().optional(),
//   }),
// });

export const updateCarValidationSchema = z.object({
  body: z
    .object({
      name: z.string(),
      description: z.string(),
      color: z.string(),
      isElectric: z.boolean(),
      features: z.array(z.string()),
      pricePerHour: z.number(),
    })
    .partial(),
});
