import { z } from 'zod'

export const studentSchema = z.object({
	id: z.string({ required_error: 'ID é obrigatório' }),
	name: z.string({ required_error: 'Nome é obrigatório' }),
	age: z.number({ required_error: 'Idade é obrigatória' }),
	contact: z.string({ required_error: 'Contato é obrigatório' }),
	belt: z.string({ required_error: 'Faixa é obrigatória' }),
})
