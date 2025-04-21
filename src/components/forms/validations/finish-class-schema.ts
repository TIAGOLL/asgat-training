import { z } from 'zod';

export const finishClassSchema = z.object({
  finish: z.boolean().default(false),
});
