import { z } from 'zod';

export const userSignupValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  role: z.enum(['user', 'admin'], {
    invalid_type_error: "Role must be either 'user' or 'admin'.",
  }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 8 characters long.' }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: 'Phone number must contain only digits.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
});

// export const UserSignupValidation = {
//   userSignupValidationSchema,
// };
