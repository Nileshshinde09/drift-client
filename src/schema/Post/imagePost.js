import { z } from 'zod';

export const PostSchema = z.object({

    caption: z.string().min(3, { message: 'Comment must contain atleast 3 characters' }),
})

