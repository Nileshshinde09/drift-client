
import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be no more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const signUpSchema = z.object({
 
  fullName: z.string().min(2, 'Full Name must be at least 2 characters').max(50, 'Full Name must be no more than 20 characters'),
  username: usernameValidation,
  email: z.string().email({ message: 'Invalid email address' }),
  gender: z.string(),
  createPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),

}).superRefine(({ confirmPassword, createPassword }, ctx) => {
  if (confirmPassword !== createPassword) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
});

