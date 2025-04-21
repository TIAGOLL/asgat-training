import { z } from 'zod';

export const notesByStudentSchema = z.array(
  z.object({
    student: z.string().min(1, { message: 'Campo obrigatório' }),
    exercise: z.string().min(1, { message: 'Campo obrigatório' }),
    note: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, {
        message: 'A nota deve ser um número com até duas casas decimais',
      })
      .transform((value) => parseFloat(value)),
  }),
);
