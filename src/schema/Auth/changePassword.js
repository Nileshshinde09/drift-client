
import { z } from 'zod';

export const changePasswordSchema = z.object({

    oldPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
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
