import { z } from 'zod';

export const supportFormSchema = z.object({

  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().min(6, { message: 'Subject must be atleast of 3 characters' }),
  content:z.string().min(6, { message: 'Content must be atleast of 3 characters' }),

})
