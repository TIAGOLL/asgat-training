import { z } from 'zod';

export const studentSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  dateOfBirth: z
    .date({
      required_error: 'Data de nascimento é obrigatória',
      invalid_type_error: 'Data de nascimento é obrigatória',
    })
    .refine((date) => new Date(date) <= new Date(), { message: 'Data de nascimento inválida' }),
  contact: z
    .number({
      required_error: 'Contato é obrigatório',
      invalid_type_error: 'O contato deve conter apenas números',
    })
    .min(11, { message: 'Telefone inválido' })
    .max(12, { message: 'Telefone inválido' }),
  belt: z
    .string({ required_error: 'Faixa é obrigatória' })
    .min(1, { message: 'Selecione uma faixa' }),
  entryDate: z.string({
    required_error: 'Data de entrada é obrigatória',
    invalid_type_error: 'Data de entrada é obrigatória',
  }),
});
