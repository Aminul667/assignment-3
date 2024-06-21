import { z } from 'zod';

const signInValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
