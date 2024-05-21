import { z } from 'zod';
import { usernameValidation } from '../Auth/signup.schema';

const updateProfileSchema = z.object({
    username: usernameValidation,
    fullName: z.string().min(2, 'Full Name must be at least 2 characters').max(50, 'Full Name must be no more than 20 characters'),
    gender: z.string(),
    dob: z.date(),
    bio: z.string().max(400),
})

export {
    updateProfileSchema
}