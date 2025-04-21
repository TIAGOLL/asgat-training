import { z } from 'zod';

export const updateClassesSchema = z.object({
  classroom: z.string().min(1, 'Selecione uma sala de aula'),
  training: z.string().min(1, 'Selecione um treinamento'),
  time: z.string().min(1, 'Selecione o horário'),
  date: z.string().min(1, 'Selecione a data'),
});
