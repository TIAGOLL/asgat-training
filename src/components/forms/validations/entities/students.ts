import { z } from 'zod';

export const studentSchema = z.object({
  nome: z
  .string({ required_error: 'Nome é obrigatório' })
  .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  .max(50,{ message: 'Nome deve não pode ter mais que 50 caracteres' })
  .regex(/^[A-Za-zÀ-ÿ\s]+$/, { message: 'O nome deve conter apenas letras e espaços' }),
  idade: z
    .date({
      required_error: 'Data de nascimento é obrigatória',
      invalid_type_error: 'Data de nascimento é obrigatória',
    })
    .refine((date) => new Date(date) <= new Date(), { message: 'Data de nascimento inválida' }),
  contato: z.string({
    required_error: 'Contato é obrigatório',    
  })
  .regex(/^\d{10,11}$/, {
    message: 'Formato de telefone inválido. Ex: 42912345678',
  }),
  faixa: z
    .string({ required_error: 'Faixa é obrigatória' })
    .min(1, { message: 'Selecione uma faixa' }),
  data_ingresso: z.string({
    required_error: 'Data de entrada é obrigatória',
    invalid_type_error: 'Data de entrada é obrigatória',
  }),
});
