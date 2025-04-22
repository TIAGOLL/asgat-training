import { z } from 'zod';

import { studentSchema } from './entities/students';

export const createClasroomSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  local: z
    .string({ required_error: 'Local é obrigatório' })
    .min(3, { message: 'Local deve ter pelo menos 3 caracteres' }),
  time: z
    .string({ required_error: 'Horário é obrigatório' })
    .min(1, { message: 'Horário é obrigatório' }),
  day: z.string({ required_error: 'Dia é obrigatório' }).refine(
    (value) => {
      const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
      return days.includes(value);
    },
    { message: 'Dia é obrigatório' },
  ),
  students: z.array(studentSchema).optional(),
});
