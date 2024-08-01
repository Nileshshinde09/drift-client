import { z } from 'zod';
import { usernameValidation } from '../Auth/signup.schema';

const updateProfileSchema = z.object({
    username: usernameValidation,
    fullName: z.string().min(2, 'Full Name must be at least 2 characters').max(50, 'Full Name must be no more than 20 characters'),
    gender: z.string().optional(),
    dob: z.date().optional(),
    bio: z.string().min(2).max(400).optional(),
})

export {
    updateProfileSchema
}
