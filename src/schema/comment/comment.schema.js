import { z } from 'zod';

export const commentSchema = z.object({

    inputComment: z.string().min(3, { message: 'Comment must contain atleast 3 characters' }),

})

