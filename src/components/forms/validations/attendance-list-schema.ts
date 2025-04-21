import { z } from 'zod';

export const attendanceListSchema = z.object({
  students: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      present: z.boolean(),
    }),
  ),
});
